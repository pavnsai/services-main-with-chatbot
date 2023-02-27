import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { CartState } from "../context/Context";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

const ServicePage = () => {
  const {
    state: { products, services, modal },
    dispatch,
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  const [spinner, setSpinner] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(services);
  useEffect(() => {
    setModalOpen(modal);
  }, [modal]);
  const handleClickfromModal = () => {
    dispatch({
      type: "CHANGE_MODAL",
      payload: {
        modal: false,
      },
    });
  };
  return (
    <div>
      <Container>
        <div style={{ marginLeft: "10%", marginTop: "15px" }}>
          <h3>Choose the service</h3>
        </div>
        {services.length === 0 ? (
          <div>
            <Spinner
              animation="grow"
              style={{ marginLeft: "40%", marginTop: "10%" }}
            />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="home">
            <div className="productContainer" style={{ marginLeft: "10%" }}>
              {services.map((prod) => (
                <ServiceCard prod={prod} key={prod.id} />
              ))}
            </div>
            {modalOpen && (
              <ServiceModal
                status={modalOpen}
                handleClick={handleClickfromModal}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServicePage;
