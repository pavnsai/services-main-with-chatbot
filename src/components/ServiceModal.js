import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Card } from "react-bootstrap";
import Rating from "./Rating";
import { FaRegSmileBeam } from "react-icons/fa";
export default function ServiceModal({ handleClick, status }) {
  return (
    <>
      <Modal show={status} onHide={handleClick}>
        <Modal.Header closeButton="true" closeVariant="white">
          <Modal.Title style={{ color: "green" }}>Servicer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "150px", overflowY: "auto" }}>
          <Card>
            <Card.Body>
              <Card.Title
                style={{ cursor: "pointer" }}
                // onClick={() => onClickFunction(prod)}
              >
                Thank you <FaRegSmileBeam color="yellow" fontSize="30px" />{" "}
              </Card.Title>
              <Card.Subtitle style={{ paddingBottom: 10 }}>
                <div>Your order was successful</div>
              </Card.Subtitle>
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
