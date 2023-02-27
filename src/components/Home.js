import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import { useHistory, useLocation } from 'react-router-dom';
import Model from './Model';
import { useState } from 'react';
// header.tsx

const Home = () => {
    const {
        state: { products },
        productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
    } = CartState();
    const location = useLocation();
    const prop = location.state?.data?.value;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setmodalData] = useState({});
    const transformProducts = () => {
        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            );
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(
                (prod) => prod.ratings >= byRating
            );
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) =>
                prod.name.toLowerCase().includes(searchQuery)
            );
        }
        if (prop) {
            sortedProducts = sortedProducts.filter((prod) =>
                prod.typeOfService.toLowerCase().includes(prop.toLowerCase())
            );
        }
        return sortedProducts;
    };
    const handleClick = (data) => {
        setModalOpen(true);
        setmodalData(data);
    };
    const handleClickfromModal = () => {
        setModalOpen(false);
    };
    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
                {transformProducts().map((prod) => (
                    <SingleProduct
                        prod={prod}
                        key={prod.id}
                        onClickFunction={(data) => handleClick(data)}
                    />
                ))}
                {modalOpen && (
                    <Model
                        status={modalOpen}
                        handleClick={handleClickfromModal}
                        prod={modalData}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
