import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./ServiceCard.scss";

const ServiceCard = ({ service }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: "/home",
            state: {
                data: { value: service.serviceName },
            },
        });
    };

    return (
        <Card className="service-card" onClick={handleClick}>
            <div className="service-image-container">
                <Card.Img
                    variant="top"
                    className="service-image"
                    src={service.image}
                    alt={service.serviceName}
                />
            </div>
            <Card.Body>
                <Card.Title className="service-title">{service.serviceName}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;