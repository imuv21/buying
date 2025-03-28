import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeatured } from '../slices/adminSlice';

import ProductCard from './ProductCard';
import Loader from './Loader';


const Grid = ({ heading, link, onPopup }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { featProducts, getFeatLoading, getFeatError } = useSelector((state) => state.admin);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        dispatch(getFeatured({ page, size, sortBy, order }));
    }, [dispatch, page, size, sortBy, order]);


    if (getFeatLoading) {
        return <Loader />;
    }

    return (
        <Fragment>
            <article className='gridHeading'><h1 className='headingBig'>{heading}</h1> <a href={link} className="textBig">See All</a></article>
            <div className='grid'>
                {getFeatError ? (<p className='text'>Error loading featured products!</p>) : !getFeatLoading && !getFeatError &&
                    featProducts && featProducts.length > 0 ? featProducts.map((pro) => (
                        <Fragment key={pro._id}>
                            <ProductCard
                                id={pro._id}
                                title={pro.title}
                                originalPrice={pro.originalPrice}
                                salePrice={pro.salePrice}
                                stocks={pro.stocks}
                                ratings={pro.averageRating}
                                images={pro.images}
                                onPopup={onPopup}
                                navigateToDetails={(id) => navigate(`/product-details/${id}`)}
                            />
                        </Fragment>
                    )) : (<p className='text'>No featured products found!</p>)}
            </div>
        </Fragment>
    )
}

export default Grid