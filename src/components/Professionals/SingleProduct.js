import { Card } from "react-bootstrap";
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
              <button
                  className="single-product-btn remove"
                  variant="danger"
                  onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                  }
              >
                Remove from Cart
              </button>
          ) : (
              <button
                  className="single-product-btn add"
                  onClick={() =>
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: prod,
                      })
                  }
                  disabled={!prod.inStock}
              >
                {!prod.inStock ? "Out of Stock" : "Add to Cart"}
              </button>
          )}
        </Card.Body>
      </Card>
  );
};

export default SingleProduct;
