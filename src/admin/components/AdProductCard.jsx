import React, { useEffect, useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import defaultImg from '../assets/images/defaultImage.jpg';


const AdProductCard = ({ name, id, images, ratings, originalPrice, salePrice, stock, onPopup, onInStockChange, navigateToDetails }) => {

    const [currentImage, setCurrentImage] = useState((images && images.length > 0 && images[0]) ? images[0] : defaultImg);
    const handleMouseEnter = () => {
        if (images && images.length > 1) {
            setCurrentImage(images[1]);
        }
    };
    const handleMouseLeave = () => {
        if (images && images.length > 0) {
            setCurrentImage(images[0]);
        }
    };

    const getStars = (ratings) => {
        const numericRating = Number(ratings) || 0;
        const fullStars = Math.floor(numericRating);
        const decimalPart = numericRating % 1;
        const halfStar = decimalPart >= 0.25 && decimalPart <= 0.75 ? 1 : 0;
        const adjustedFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;
        const emptyStars = Math.max(5 - adjustedFullStars - halfStar, 0);
        return { fullStars: Math.min(adjustedFullStars, 5), halfStar, emptyStars };
    };
    const { fullStars, halfStar, emptyStars } = getStars(ratings);

    const discountPercentage = ((originalPrice - salePrice) / originalPrice) * 100;
    const inStock = Number(stock) > 0;

    useEffect(() => {
        if (onInStockChange) {
            onInStockChange(inStock);
        }
    }, [inStock, onInStockChange]);

    return (
        <div className='show-img-detail-sub' onClick={() => navigateToDetails(id)}>
            <img className='product-img-size' src={currentImage} alt={`${name}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <div className="discount-icon">{discountPercentage.toFixed(0)}% OFF</div>
            <div className='product-detail-info'>
                <div className="starCont">
                    {[...Array(fullStars || 0)].map((_, i) => (
                        <span key={`full-${i}`} className="star"><StarIcon /></span>
                    ))}
                    {halfStar === 1 && (
                        <span className="star"><StarHalfIcon /></span>
                    )}
                    {[...Array(emptyStars || 0)].map((_, i) => (
                        <span key={`empty-${i}`} className="dullStar"><StarOutlineIcon /></span>
                    ))}
                    &nbsp;&nbsp;<span className="text">{ratings}</span>
                </div>
                <p className='product-title'>{name.length > 25 ? `${name.substring(0, 25)}...` : name}</p>
                <div className='flex' style={{ gap: '10px' }}>
                    <p className='product-discount'>Rs. {Number(originalPrice).toFixed(2)}₹</p>
                    <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
                </div>
                <button onClick={(event) => { event.stopPropagation(); onPopup(id); }}>
                    <AddShoppingCartIcon />Add to cart
                </button>
            </div>
        </div>
    )
};

export default AdProductCard