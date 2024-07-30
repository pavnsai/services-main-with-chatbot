import React, { useEffect, useState } from 'react';
import { FaShoppingCart,FaBars } from 'react-icons/fa';
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
import { Link, useLocation, useHistory } from 'react-router-dom';
import { CartState } from '../../context/Context';
import { Auth } from 'aws-amplify';
import './Header.scss';
import {useCleanup} from "../Utils/CleanupContext";

const Header = () => {
    const {
        state: { cart, isLogin },
        dispatch,
        productDispatch,
    } = CartState();
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const { cleanup } = useCleanup();
    const handleNavigation = () => {
        cleanup();
    };
    useEffect(() => {
        setLoggedIn(isLogin);
    }, [isLogin]);

    async function signOut() {
        try {
            await Auth.signOut();
            setLoggedIn(false);
            dispatch({ type: 'CHANGE_LOGIN', payload: { state: false } });
            dispatch({ type: 'CHANGE_USERNAME', payload: { userName: '' } });
            history.push('/');
        } catch (error) {
            console.error('error signing out: ', error);
        }
    }

    const showSearch = !['cart','services', '','login', 'orders'].includes(location.pathname.split('/')[1]);

    return (
        <Navbar bg="custom" variant="dark" expand="lg" className="header-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand" style={{ marginLeft: 0 }}>
                    <BsFillCloudDownloadFill className="brand-icon" />
                    <span className="brand-name">Freelancepromarket</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler">
                    <FaBars className="hamburger-icon" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/services" onClick={() => handleNavigation()} className={location.pathname === '/services' ? 'active' : ''}>Services</Nav.Link>
                        <Nav.Link as={Link} to="/orders" onClick={() => handleNavigation()} className={location.pathname === '/orders' ? 'active' : ''}>Orders</Nav.Link>
                    </Nav>
                    {showSearch && (
                        <FormControl
                            type="search"
                            placeholder="Search a professional..."
                            className="search-input"
                            aria-label="Search"
                            onChange={(e) => productDispatch({
                                type: 'FILTER_BY_SEARCH',
                                payload: e.target.value,
                            })}
                        />
                    )}
                    <Nav className="ms-auto">
                        <div className="d-flex align-items-center">
                            {loggedIn ? (
                                <Button variant="outline-danger" onClick={signOut}>Logout</Button>
                            ) : (
                                <Button as={Link} to="/login" onClick={() => handleNavigation()} variant="outline-success">Login</Button>
                            )}
                            <Dropdown align="end" className="cart-dropdown">
                                <Dropdown.Toggle id="dropdown-cart">
                                    <FaShoppingCart/>
                                    <Badge bg="secondary">{cart.length}</Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {cart.length > 0 ? (
                                        <>
                                            {cart.map((prod) => (
                                                <Dropdown.Item key={prod.id} className="cart-item">
                                                    <img src={prod.image} alt={prod.name} className="cart-item-img"/>
                                                    <span className="cart-item-name">{prod.name}</span>
                                                    <span className="cart-item-price">${prod.price.split('.')[0]}</span>
                                                    <AiFillDelete
                                                        className="cart-item-delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            dispatch({
                                                                type: 'REMOVE_FROM_CART',
                                                                payload: prod,
                                                            });
                                                        }}
                                                    />
                                                </Dropdown.Item>
                                            ))}
                                            <Dropdown.Divider/>
                                            <Dropdown.Item as={Link} onClick={() => handleNavigation()} to="/cart" className="text-center">
                                                <Button variant="primary" block>Go To Cart</Button>
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        <Dropdown.Item>Cart is Empty!</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
