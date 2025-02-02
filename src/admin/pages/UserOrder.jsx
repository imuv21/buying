import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { userOrdersList } from '../../assets/schemas';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const UserOrder = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate('/dashboard/user-list');
    }

    return (
        <Fragment>
            <article className="sortCat">
                <div className="backSection">
                    <ArrowBackIosNewIcon onClick={back} /> <h1 className="heading">Orders List</h1>
                </div>
                <select name="sort">
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </article>

            <article className='usersList'>
                <div className="userRow">
                    <div className="index fw-600">index</div>
                    <div className="email fw-600">order ID</div>
                    <div className="email fw-600">Address</div>
                    <div className="datePriceNum fw-600">total products</div>
                    <div className="datePriceNum fw-600">total price</div>
                    <div className="datePriceNum fw-600">date</div>
                    <div className="datePriceNum fw-600">status</div>
                </div>

                {userOrdersList && userOrdersList.length > 0 && userOrdersList.map((order, index) => (
                    <div className="userRow" key={index}>
                        <div className="index">{index + 1}</div>
                        <div className="email">{order.orderId?.length > 20 ? `${order.orderId.substring(0, 20)}...` : order.orderId}</div>
                        <div className="email">{order.address?.length > 20 ? `${order.address.substring(0, 20)}...` : order.address}</div>
                        <div className="datePriceNum">{order.numberOfProducts}</div>
                        <div className="datePriceNum">Rs. {Number(order.totalPrice).toFixed(2)}</div>
                        <div className="datePriceNum">{order.date}</div>
                        <div className="datePriceNum">
                            <select name="status" value={order.orderStatus} onChange={(e) => { const newStatus = e.target.value; }}>
                                <option value="Placed">Placed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </article>
        </Fragment>
    )
}

export default UserOrder