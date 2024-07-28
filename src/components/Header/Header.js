import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillCloudDownloadFill } from 'react-icons/bs';
import {
    Badge,
    Button,
    Container,
    Dropdown,
    FormControl,
    Nav,
    Navbar,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { CartState } from '../../context/Context';
import './Header.css';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const {
        state: { cart, isLogin },
        dispatch,
        productDispatch,
    } = CartState();
    const history = useHistory();
    const [loggedIn, setloggedIn] = useState(false);
    useEffect(() => {
        setloggedIn(isLogin);
    }, [isLogin]);
    async function signOut() {
        try {
            await Auth.signOut();
            setloggedIn(false);
            dispatch({
                type: 'CHANGE_LOGIN',
                payload: {
                    state: false,
                },
            });
            dispatch({
                type: 'CHANGE_USERNAME',
                payload: {
                    userName: '',
                },
            });
            history.push({
                pathname: '/',
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <BsFillCloudDownloadFill color="#7cfc00" fontSize="40px"  />
                    <Link to="/">
                        <span
                            style={{
                                fontFamily: 'Montserrat',
                                fontWeight: 600,
                                fontSize: '25px',
                                color: '#7cfc00',
                                marginLeft: '10px'
                            }}
                        >
                            Freelancepromarket
                        </span>
                    </Link>
                </Navbar.Brand>

                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>

                {!['cart', '', 'orders'].includes(
                    useLocation().pathname.split('/')[1]
                ) && (
                    <Navbar.Text className="search">
                        <FormControl
                            style={{ width: 350 }}
                            type="search"
                            placeholder="Search a professional..."
                            className="m-auto"
                            aria-label="Search"
                            onChange={(e) => {
                                productDispatch({
                                    type: 'FILTER_BY_SEARCH',
                                    payload: e.target.value,
                                });
                            }}
                        />
                    </Navbar.Text>
                )}

                <Navbar.Brand>
                    <Link to="/orders">Orders</Link>
                </Navbar.Brand>

                <Navbar.Brand>
                    {' '}
                    {loggedIn ? (
                        <Link onClick={signOut}>
                            <div>
                                <Button
                                    style={{ width: '95%', margin: '0 10px' }}
                                    variant="danger"
                                >
                                    Logout
                                </Button>
                                {/* <RiLogoutCircleRFill color="white" fontSize="40px" /> Logout */}
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <div>
                                <Button
                                    style={{ width: '95%', margin: '0 10px' }}
                                    variant="success"
                                >
                                    Login
                                </Button>
                            </div>
                        </Link>
                    )}
                </Navbar.Brand>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((prod) => (
                                        <span
                                            className="cartitem"
                                            key={prod.id}
                                        >
                                            <img
                                                src={prod.image}
                                                className="cartItemImg"
                                                alt={prod.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>
                                                    $ {prod.price.split('.')[0]}
                                                </span>
                                            </div>
                                            <div className="cartItemDetail2">
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        dispatch({
                                                            type: 'REMOVE_FROM_CART',
                                                            payload: prod,
                                                        })
                                                    }
                                                />{' '}
                                            </div>
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button
                                            style={{
                                                width: '95%',
                                                margin: '0 10px',
                                            }}
                                        >
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>
                                    Cart is Empty!
                                </span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
