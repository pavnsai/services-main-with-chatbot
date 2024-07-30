import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Rating from "../Rating/Rating";
import "./ProfessionalModal.css";

export default function ProfessionalModal({ show, handleClose, professional }) {
    return (
        <Modal show={show} onHide={handleClose} centered className="pro-modal">
            <Modal.Header >
                <Modal.Title>{professional.name}</Modal.Title>
                <Button className="close" onClick={handleClose}>
                    <span>&times;</span>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <div className="pro-card">
                    <div className="pro-image">
                        <img
                            className="rounded-circle"
                            alt={professional.name}
                            src={professional.image}
                        />
                    </div>
                    <div className="pro-info">
                        <p><strong>Description:</strong> {professional.description}</p>
                        <p><strong>Age:</strong> {professional.age}</p>
                        <p><strong>Education:</strong> {professional.education}</p>
                        <p><strong>Hometown:</strong> {professional.home}</p>
                        <p><strong>Cost:</strong> ${professional.price.split(".")[0]}</p>
                        <div className="pro-rating">
                            <strong>Rating:</strong>
                            <Rating rating={professional.ratings} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}