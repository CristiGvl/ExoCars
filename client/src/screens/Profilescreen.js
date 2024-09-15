import React, { useState, useEffect, useMemo } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import {Tag } from 'antd'

const { TabPane } = Tabs;

function Profilescreen() {
    const user = useMemo(() => JSON.parse(localStorage.getItem("currentUser")), []);

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    if (!user) {
        return <Loader />;
    }

    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="2">
                    <p>My Profile</p>
                    <br />
                    <p>Name : {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</p>
                </TabPane>
                <TabPane tab="Bookings" key="3">
                    <MyBookings user={user} />
                </TabPane>
            </Tabs>
        </div>
    );
}

export function MyBookings({ user }) {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setloading(true);
                const response = await axios.post("/api/bookings/getbookingbyuserid", { userid: user._id });
                const cars = response.data;
                console.log(cars);
                setbookings(cars);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    async function cancelBooking(bookingid, carid) {
        try {
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, carid })).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled ', 'success').then(result => {
                window.location.reload()
            })

        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')

        }

    }

    return (

        <div className="row">
            <div className="col-md-6">
                {loading && <Loader />}
                {bookings && bookings.map(booking => (
                    <div className="box-shadow" key={booking._id}>
                        <h6>{booking.car}</h6>
                        <p><b>BookingId</b>: {booking._id}</p>
                        <p><b>TransactionId</b>: {booking.transactionId}</p>
                        <p><b>CheckIn</b>: {booking.fromdate}</p>
                        <p><b>CheckOut</b>: {booking.todate}</p>
                        <p><b>Amount</b>: {booking.totalamount}</p>
                        <p><b>Status</b>: {" "}
                        {booking.status === 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>) }</p>
                        {booking.status !== 'cancelled' && (<div className="text-right">
                            <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.carid) }}>CANCEL BOOKING</button>
                        </div>)}
                    </div>
                ))}
                {error && <Error />}
            </div>
        </div>

    );
}

export default Profilescreen;
