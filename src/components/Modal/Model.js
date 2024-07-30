import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import "./Modal.css";

export default function Model({ handleClick, status, prod }) {
  return (
      <Modal show={status} onHide={handleClick} centered className="professional-modal">
        <Modal.Header closeButton>
          <Modal.Title>{prod.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="professional-card">
            <div className="professional-image">
              <img
                  className="rounded-circle"
                  alt={prod.name}
                  src={prod.image}
              />
            </div>
            <Card.Body>
              <div className="professional-info">
                <p><strong>Description:</strong> {prod.description}</p>
                <p><strong>Age:</strong> {prod.age}</p>
                <p><strong>Education:</strong> {prod.education}</p>
                <p><strong>Hometown:</strong> {prod.home}</p>
                <p><strong>Cost:</strong> ${prod.price.split(".")[0]}</p>
                <div className="professional-rating">
                  <strong>Rating:</strong>
                  <Rating rating={prod.ratings} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}