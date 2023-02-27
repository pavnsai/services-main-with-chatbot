import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Card } from "react-bootstrap";
import Rating from "./Rating";

export default function Model({ handleClick, status, prod }) {
  return (
    <>
      <Modal show={status} onHide={handleClick}>
        <Modal.Header closeButton="true" closeVariant="white">
          <Modal.Title style={{ color: "#00008B" }}>{prod.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px", overflowY: "auto" }}>
          <Card>
            <img
              className="rounded-circle shadow-4-strong"
              alt={prod.name}
              src={prod.image}
            />
            <Card.Body style={{ marginLeft: "10px" }}>
              <Card.Title>
                <span style={{ color: "green" }}>Description: &nbsp;</span>
                {prod.description}
              </Card.Title>
              <Card.Title>
                <span style={{ color: "green" }}>Age: &nbsp;</span>
                {prod.age}
              </Card.Title>
              <Card.Title>
                <span style={{ color: "green" }}>Education: &nbsp;</span>
                {prod.education}
              </Card.Title>
              <Card.Title>
                <span style={{ color: "green" }}>HomeTown: &nbsp;</span>
                {prod.home}
              </Card.Title>
              <Card.Title>
                <span style={{ color: "green" }}>Cost: &nbsp;</span>$
                {prod.price.split(".")[0]}
              </Card.Title>
              <Card.Title>
                <span style={{ color: "green" }}>Rating: &nbsp;</span>
                <Rating rating={prod.ratings} />
              </Card.Title>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
