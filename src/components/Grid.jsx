import React, { Fragment, useState } from 'react';
import { products } from '../assets/Schemas';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';


const Grid = ({ heading, link }) => {

    const navigate = useNavigate();
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [inStockData, setInStockData] = useState(false);
    const [proid, setProid] = useState(null);

    const handleClickFooter = (id) => {
        setProid(id);
        setIsClickedFooter(true);
    };

    const handleInStockChange = (inStock) => {
        setInStockData(inStock);
    };

    return (
        <Fragment>
            <article className='gridHeading'><h1 className='headingBig'>{heading}</h1> <a href={link} className="textBig">See All</a></article>
            <div className='grid'>
                {products && products.length > 0 && products.slice(0, 10).map((pro, index) => (
                    <Fragment key={index}>
                        <ProductCard
                            name={pro.name}
                            id={pro.productId}
                            images={pro.image}
                            ratings={pro.ratings}
                            originalPrice={pro.originalPrice}
                            salePrice={pro.salePrice}
                            stock={pro.stock}
                            onPopup={handleClickFooter}
                            onInStockChange={handleInStockChange}
                            navigateToDetails={(id) => navigate(`/product-details/${id}`)}
                        />
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}

export default Grid