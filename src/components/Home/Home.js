import { CartState } from '../../context/Context';
import Filters from '../Filters/Filters';
import SingleProduct from '../Professionals/SingleProduct';
import { useHistory, useLocation } from 'react-router-dom';
import Modal from '../Modal/Model';
import { useState } from 'react';
import './Home.scss';

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
                prod.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="home-container">
                <aside className="filters-sidebar">
                    <Filters />
                </aside>
                <main className="products-main">
                    <div className="product-grid">
                        {transformProducts().map((prod) => (
                            <SingleProduct
                                prod={prod}
                                key={prod.id}
                                onClickFunction={(data) => handleClick(data)}
                            />
                        ))}
                    </div>
                    {modalOpen && (
                        <Modal
                            status={modalOpen}
                            handleClick={handleClickfromModal}
                            prod={modalData}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
