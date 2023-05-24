
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';



function Bookingscreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    // const roomid=useParams();

    // let { roomid } = useParams();
    // let { fromdate } = useParams();
    // let { todate } = useParams();

    // const totaldays= moment.duration(todate.diff(fromdate))

    let { roomid, fromdate, todate } = useParams();
    const firstdate = moment(fromdate, 'DD-MM-YYYY')
    const lastdate = moment(todate, 'DD-MM-YYYY')

    const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1

    const [totalamount, settotalamount] = useState();

    // useEffect(async () => {
    //     try {
    //         setloading(true)
    //         const data = (await axios.post('/api/rooms/getroombyid')).data;
    //         setroom(data);
    //         setloading(false);
    //     } catch (error) {
    //         setloading(false);
    //         seterror(true);
    //     }

    // }, []);
    // useEffect(() => {
    //     async function postData() {
    //         try {
    //             setloading(true)
    //             const data = (await axios.get('/api/rooms/getroombyid')).data;
    //             setroom(data)
    //             setloading(false)
    //         } catch (error) {
    //             seterror(true)
    //             console.error(error);
    //             // setloading(false)
    //         }
    //     }
    //     postData();

    // }, []);
    useEffect(() => {
        // if(localStorage.getItem('currentUser')){
        //     window.location.reload='/login'
        // }
        const fetchData = async () => {
            try {
                setloading(true)
                const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data
                settotalamount(totaldays * data.rentperday)
                setroom(data)
                setloading(false)
                console.log(data);
            } catch (error) {
                seterror(true)
                console.log(error);
                setloading(false)
            }
        };
        fetchData();
    }, []);
    

    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token

        };
        try {
            const result = await axios.post("/api/bookings/bookroom", bookingDetails)

        } catch (error) {
            console.log("****************************json**********")
        }
    }

    return ( 

        <div className='m-5'>
            {loading ? <Loader /> : room ? (<div>

                <div className="row justify-content-center mt-5 bs">

                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name :{JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>From Date : {fromdate}</p>
                                <p>To Date : {todate}</p>
                                <p>Maxcount : {room.maxcount}</p>

                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : {totaldays}</p>
                                <p>Membership per day : {room.rentperday}</p>
                                <p>Total Amount :{totalamount} </p>

                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                            
                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='INR'
                                stripeKey="pk_test_51My8sfSI8YvYoZIMP40cQ4LI7xbl9n4ErgzfRbUBFdwIqnGPj4hoAj9d0M2gd3KCOR8acZNAmC18RxuouFsJuUu800bTVxwywx"
                            >
                                
                                <button className='btn btn-primary'>Pay Now</button>


                            </StripeCheckout>

                        </div>

                    </div>
                </div>

            </div>) : (
                <Error />
            )}


        </div>

    );

}



export default Bookingscreen;