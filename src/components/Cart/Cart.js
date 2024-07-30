import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row, Container } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CartState } from '../../context/Context';
import Rating from '../Rating/Rating';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Cart.scss';

const Cart = () => {
    const { state: { cart }, dispatch } = CartState();
    const [total, setTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) =>
                acc + Number(curr.price) * Number(curr.qty.toString().substring(0, 1)), 0
            )
        );
    }, [cart]);

    useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: false })
            .then((user) => {
                dispatch({ type: 'CHANGE_LOGIN', payload: { state: true } });
                dispatch({ type: 'CHANGE_USERNAME', payload: { userName: user.username } });
            })
            .catch((err) => {
                dispatch({ type: 'CHANGE_LOGIN', payload: { state: false } });
                dispatch({ type: 'CHANGE_USERNAME', payload: { userName: '' } });
                console.log(err);
            });
    }, [dispatch]);

    const handleCheckout = () => {
        history.push({ pathname: '/checkout', state: { data: 'jds' } });
    };

    return (
        <Container className="cart-page-container">
            <h2 className="cart-page-title">Your Cart</h2>
            <Row>
                <Col md={8}>
                    <ListGroup className="cart-page-list">
                        {cart.map((prod) => (
                            <ListGroup.Item key={prod.id} className="cart-page-item">
                                <Row className="align-items-center">
                                    <Col xs={3} md={2}>
                                        <Image src={prod.image} alt={prod.name} fluid rounded className="cart-item-image" />
                                    </Col>
                                    <Col xs={9} md={10}>
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <h5 className="cart-page-item-name">{prod.name}</h5>
                                            </Col>
                                            <Col md={1}>
                                                <span className="cart-page-item-price">${prod.price}</span>
                                            </Col>
                                            <Col md={3}>
                                                <Rating rating={prod.ratings} />
                                            </Col>
                                            <Col md={3}>
                                                <Form.Control
                                                    as="select"
                                                    value={prod.qty}
                                                    onChange={(e) => dispatch({
                                                        type: 'CHANGE_CART_QTY',
                                                        payload: { id: prod.id, qty: e.target.value },
                                                    })}
                                                >
                                                    {[...Array(prod.inStock).keys()].map((x) => (
                                                        <option key={x + 1}>
                                                            {x + 1} {x + 1 === 1 ? 'hour' : 'hours'}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => dispatch({
                                                        type: 'REMOVE_FROM_CART',
                                                        payload: prod,
                                                    })}
                                                >
                                                    <AiFillDelete fontSize="20px" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <div className="cart-page-summary">
                        <h4>Order Summary</h4>
                        <p>Subtotal ({cart.length} items)</p>
                        <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
                        <Button
                            variant="primary"
                            size="lg"
                            block
                            disabled={cart.length === 0}
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;