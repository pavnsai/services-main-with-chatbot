import { Button, Form } from 'react-bootstrap';
import { CartState } from '../../context/Context';
import Rating from '../Rating/Rating';
import './Filters.scss';

const Filters = () => {
    const {
        productDispatch,
        productState: { byStock, byFastDelivery, sort, byRating },
    } = CartState();


    return (
        <div className="filters">
            <h3 className="filters-title">Filter Professionals</h3>
            <Form>
                <Form.Group>
                    <Form.Check
                        type="radio"
                        id="sort-ascending"
                        label="Price: Low to High"
                        name="sortGroup"
                        onChange={() =>
                            productDispatch({
                                type: 'SORT_BY_PRICE',
                                payload: 'lowToHigh',
                            })
                        }
                        checked={sort === 'lowToHigh'}
                    />
                    <Form.Check
                        type="radio"
                        id="sort-descending"
                        label="Price: High to Low"
                        name="sortGroup"
                        onChange={() =>
                            productDispatch({
                                type: 'SORT_BY_PRICE',
                                payload: 'highToLow',
                            })
                        }
                        checked={sort === 'highToLow'}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <div className="rating-filter">
                        <Rating
                            rating={byRating}
                            onClick={(i) =>
                                productDispatch({
                                    type: 'FILTER_BY_RATING',
                                    payload: i + 1,
                                })
                            }
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </Form.Group>
                <Button
                    variant="outline-secondary"
                    onClick={() =>
                        productDispatch({
                            type: 'CLEAR_FILTERS',
                        })
                    }
                    className="clear-filters-btn"
                >
                    Clear Filters
                </Button>
            </Form>
        </div>
    );
};

export default Filters;
