import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import defaultImg from '../../assets/images/defaultImage.jpg';


const FeatProCard = ({ id, title, originalPrice, salePrice, ratings, images, onPopup, navigateToDetails, navigateToEditProduct }) => {

    const [currentImage, setCurrentImage] = useState((images && images.length > 0 && images[0]) ? images[0] : defaultImg);
    const handleMouseEnter = () => {
        if (images && images.length > 1) {
            setCurrentImage(images[1] || defaultImg);
        }
    };
    const handleMouseLeave = () => {
        if (images && images.length > 0) {
            setCurrentImage(images[0] || defaultImg);
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
    const isDiscount = salePrice < originalPrice;

    return (
        <div className='show-img-detail-sub' onClick={() => navigateToDetails(id)}>
            <img className='product-img-size' src={currentImage || defaultImg } alt={`${title}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            {isDiscount && <div className="discount-icon">{discountPercentage.toFixed(0)}% OFF</div>}
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
                    &nbsp;&nbsp;<span className="textSmol">{ratings}</span>
                </div>
                <p className='text'>{title.length > 25 ? `${title.substring(0, 25)}...` : title}</p>
                {isDiscount ? (<div className='flex' style={{ gap: '10px' }}>
                    <p className='product-discount' style={isDiscount ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>Rs. {Number(originalPrice).toFixed(2)}₹</p>
                    <p className='product-price'>Rs. {Number(salePrice).toFixed(2)}₹</p>
                </div>) : (<p className='product-discount'>Rs. {Number(originalPrice).toFixed(2)}₹</p>)}
                <div className="flex center g20 w100">
                    <button className='quantity-btn' onClick={(event) => { event.stopPropagation(); navigateToEditProduct(id); }}>Edit</button>
                    <button className='remove-btn' onClick={(event) => { event.stopPropagation(); onPopup(id); }}>Remove</button>
                </div>
            </div>
        </div>
    )
};

export default FeatProCard