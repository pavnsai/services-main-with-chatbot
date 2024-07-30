import { Card, Button } from "react-bootstrap";
import { CartState } from "../../context/Context";
import Rating from "../Rating/Rating";
import "./SingleProduct.scss";

const SingleProduct = ({ prod, onClickFunction }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
      <Card className="single-product">
        <div className="product-image" onClick={() => onClickFunction(prod)}>
          <img
              className="rounded-circle"
              alt={prod.name}
              src={prod.image}
          />
        </div>
        <Card.Body>
          <Card.Title
              className="product-name"
              onClick={() => onClickFunction(prod)}
          >
            {prod.name}
          </Card.Title>
          <Card.Subtitle className="product-price-rating">
            <div className="product-price">${prod.price.split(".")[0]}</div>
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
  );
};

export default SingleProduct;
