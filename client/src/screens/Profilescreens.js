import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tabs } from 'antd';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';
const { TabPane } = Tabs;
function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])

    return (
        <div className="ml-5 mt-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1" className='bs'>
                   <div className='m-5'>
                    <p><b>My Profile</b></p>
                    <hr></hr>
                    <p> <b>Name : {user.name} </b></p>
                    <p><b>Email : {user.email} </b></p>
                    <p><b>isAdmin : {user.isAdmin ? 'YES' : 'NO'} </b></p>


                   </div>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>
        </div>
    )
}
export default Profilescreen;



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                setloading(false)
                // const rooms = await(axios.post('/api/bookings/getbookingsbyuserid',{userid:user._id}).data)
                // console.log(rooms)
                const { data } = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
                console.log(data);
                setbookings(data)
                /*edittt */
                // Swal.fire('Congrat', 'Your booking has been done', 'success').then(result => {
                //     window.location.reload()
                // })
                /*edit finish */
                // setData(response);

            }
            catch (error) {
                console.log({ error })
                setloading(false)
                seterror(error)
            }
        }
        fetchData();


    }, [])

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = (await (axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data);
            console.log(result);
            setloading(false)
            Swal.fire('Congrat', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log("mai idhar")
            console.log({ error });
            setloading(false)
            Swal.fire('Ooops', 'Something went wrong', 'error')
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>

                            <h1>{booking.room}</h1>
                            <p><b>BookingId</b> :{booking._id}</p>
                            <p><b>Member from </b> : {booking.fromdate}</p>
                            <p><b>Member by</b> : {booking.todate}</p>
                            <p><b>Amount</b> : {booking.totalamount}</p>
                            <p><b>Status</b> : {booking.status === 'cancelled' ? <Tag color="orange">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag>}</p>
                            {booking.status !== 'cancelled' && (<div className='text-right'>
                                <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                            </div>)}

                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}

/*
eEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); /
*/
