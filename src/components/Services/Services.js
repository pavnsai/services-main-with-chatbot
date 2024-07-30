import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { CartState } from "../../context/Context";
import ServiceCard from "./ServiceCard";
import "./Services.scss";

const Services = () => {
  const {
    state: { services },
  } = CartState();

  return (
      <div className="services-container">
        <Container>
          <h3 className="services-title">Choose the service</h3>
          {services.length === 0 ? (
              <div className="loading-spinner">
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
              </div>
          ) : (
              <div className="services-grid">
                {services.map((service) => (
                    <ServiceCard service={service} key={service.id} />
                ))}
              </div>
          )}
        </Container>
      </div>
  );
};

export default Services;