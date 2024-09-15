import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";

function Bookingscreen() {
    const { carid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [car, setCar] = useState();

    const fromdateMoment = moment(fromdate, 'DD-MM-YYYY');
    const todateMoment = moment(todate, 'DD-MM-YYYY');

    console.log("From date:", fromdateMoment);
    console.log("To date:", todateMoment);
    const totaldays = todateMoment.diff(fromdateMoment, 'days');

    const totalamount = car ? totaldays * car.rentperday : null;


    useEffect(() => {
        if(!localStorage.getItem('currentUser')){
            window.location.reload='login'
        }
        const fetchCar = async () => {
            try {
                setLoading(true)
                const response = await axios.post("/api/cars/getcarbyid", { carid });
                setCar(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(true);
            }
        };

        fetchCar();
    }, [carid]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error />
    }

    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            car,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setLoading(true);
            const result = await axios.post('/api/bookings/bookcar', bookingDetails)
            setLoading(false);
            Swal.fire('Congratulations', 'Your Car is Booked Successfully', 'success').then(result=>{
                window.location.href='/profile'
            })

        } catch (error) { 
            setLoading(false)
            Swal.fire('Oops...', 'Something went wrong', 'error')

        }
    }


    return (
        <div className="m-5">
            {car ? (
                <div className="row justify-content-center mt-5 box-shadow">
                    <div className="col-md-6">
                        <h1>{car.name}</h1>
                        <img src={car.imageurls[0]} className="bigimg" alt="Car" />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>From Date : {fromdate} </p>
                                <p>To Date : {todate} </p>
                                <p>Max Count : {car.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : {totaldays}</p>
                                <p>Rent per day : {car.rentperday}</p>
                                <p>Total amount : {totalamount} </p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>

                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency="RON"
                                stripeKey="pk_test_51PM637EUZMjP2QLVHpYvpkCbaLGPmq4g5AueEv5fxbqB5j2wWwpASD8XnbQLLb6F8NohxA4QeeCXDMtPwjCj6kpq00AXepRNlZ"
                            >
                                <button className="btn btn-primary">Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default Bookingscreen;
