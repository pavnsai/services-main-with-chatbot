import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { useHistory } from "react-router-dom";

const ServiceCard = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const history = useHistory();
  return (
    <div style={{ width: "30%", margin: "10px" }}>
      {" "}
      <Card
        onClick={() => {
          history.push({
            pathname: "/home",
            state: {
              data: { value: prod.serviceName },
            },
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          //   class="rounded-circle"
          className="serviceItemImage"
          src={prod.image}
          alt={prod.name}
        />
        <Card.Body>
          <Card.Title>{prod.serviceName}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}></Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceCard;
