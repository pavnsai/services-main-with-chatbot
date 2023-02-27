import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./prod.css";

const SingleProduct = ({ prod, onClickFunction }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        {/* <Card.Img variant="top" src={prod.image} alt={prod.name} /> */}
        <img
          className="rounded-circle shadow-4-strong"
          alt={prod.name}
          src={prod.image}
          onClick={() => onClickFunction(prod)}
        />
        <Card.Body>
          <Card.Title
            style={{ cursor: "pointer" }}
            onClick={() => onClickFunction(prod)}
          >
            <p style={{ color: "green" }}>
              {" "}
              <a>{prod.name}</a>
            </p>
          </Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <div>$ {prod.price.split(".")[0]}</div>
            <Rating rating={prod.ratings} onClick={(i) => {}} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
