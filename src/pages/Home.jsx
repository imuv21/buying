import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { getCart } from '../slices/productSlice';
import Loader from '../components/Loader';
import Carousel from '../components/Carousel';
import Grid from '../components/Grid';


const TextSlider = lazy(() => import('../components/TextSlider'));
const ImageSlider = lazy(() => import('../components/ImageSlider'));


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);


    return (
        <Fragment>
            <Helmet>
                <title>Buying - Best Deals, Affordable Shopping</title>
                <meta name="description" content="Explore the best deals on a wide range of products at Buying. Your one-stop online shop for quality items at unbeatable prices. Shop now and save big!" />
                <link rel="canonical" href="https://buying.netlify.app" />
            </Helmet>
            <Suspense fallback={<Loader />}>
                <ImageSlider interval={5000} />
                <TextSlider />
            </Suspense>
            <section className='page flexcol center'>
                <Grid heading={"Featured Products"} link={'/all-products'} />
                <Grid heading={"New Arrivals"} link={'/new-arrivals'} />
                <Carousel heading={"Best Sellers"} link={'/best-sellers'} />
            </section>
        </Fragment>
    );
};

export default Home;