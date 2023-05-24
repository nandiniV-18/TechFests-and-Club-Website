import axios from 'axios'
import React, { useState, useEffect, Component } from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Tabs } from 'antd';

import { Divider, Space, Tag } from 'antd';
const { TabPane } = Tabs;
function Adminscreen() {

    console.log("hadipppppaa");
    console.log(JSON.parse(localStorage.getItem("currentuser")));
    // useEffect(()=>{

    //     if((JSON.parse(localStorage.getItem("currentuser"))[4]==false)){
    //         window.location.href='/home'
    //     }
    // },[])
    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(() => {
        if (user.isAdmin==false) {
            console.log("ajhdab")
            window.location.href = '/home'
        }
    }, [])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontStyle: '30px' }}><b> Admin Panel </b></h2>
            <b>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />

                </TabPane>
                <TabPane tab="Clubs" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add CLub" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>

            </Tabs></b>

        </div>
    )
}

export default Adminscreen
// Bookings List Component

export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('/api/bookings/getallbookings');
                console.log(data);
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        }
        fetchData();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>



                <h1>Bookings</h1>

                {loading && (<Loader />)}

                <table className='table table-border table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Club</th>
                            <th>from</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>

                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}

                    </tbody>
                </table>



            </div>
        </div>

    );
}

export function Rooms() {

    // ROOm List Component

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('/api/rooms/getallrooms');
                console.log(data);
                setrooms(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        }
        fetchData();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>
                service
                <h1>Bookings</h1>

                {loading && (<Loader />)}

                <table className='table table-border table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Club Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per day</th>
                            <th>Max Count</th>
                            <th>Phoe Number</th>
                        </tr>

                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}

                    </tbody>
                </table>



            </div>
        </div>

    )
}





export function Users() {

    // Users List Component
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('/api/users/getallusers');
                console.log(data);
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && <Loader />}
                <table className='table table-dark table-bordered'>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>

                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}






// ADD ROOM List Component
export function Addroom() {
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const[name,setname]=useState('')
    const[rentperday,setrentperday]=useState()
    const[maxcount,setmaxcount]=useState()
    const[description,setdescription]=useState()
    const[phonenumber,setphonenumber]=useState()
    const[type,settype]=useState()
    const[imageurl1,setimmageurl1]=useState()
    const[imageurl2,setimmageurl2]=useState()
    const[imageurl3,setimmageurl3]=useState()

    async function addRoom(){



        const newroom = {
            name,
            rentperday,maxcount,
            description,
            phonenumber,
            type,
            imageurls:[imageurl1,imageurl2,imageurl3]

        }
        try {
            setloading(true)
            const { data } = await axios.post('/api/rooms/addroom',newroom);
            console.log(data);
            setloading(false)
            Swal.fire('Congrats',"Your New Room Added Successfullly",'success').then(result=>{
                window.location.href='/home'
            })

        } catch (error) {
            console.log({error})
            setloading(false)
            Swal.fire('Ooop','Some went wrong','error')
        }
        console.log(newroom)
    }



    return (
        <div className='row'>
            
            <div className='col-md-5'>
            {loading && <Loader/>}
                <input type='text' className='form-control' placeholder='club name' 
                value={name} onChange={(e)=>setname(e.target.value)}/>
                <br></br>

                <input type='text' className='form-control' placeholder=' club fee per day' 
                value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>
                <br></br>


                <input type='text' className='form-control' placeholder='max count' 
                value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
                <br></br>

                <input type='text' className='form-control' placeholder='description'
                value={description} onChange={(e)=>{setdescription(e.target.value)}} />
                <br></br>

                <input type='text' className='form-control' placeholder='phone number'
                value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} />
                <br></br>

            </div>
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='type'
                value={type} onChange={(e)=>{settype(e.target.value)}} />
                <br></br>
                <input type='text' className='form-control' placeholder='image URL 1' 
                value={imageurl1} onChange={(e)=>{setimmageurl1(e.target.value)}}/>
                <br></br>

                <input type='text' className='form-control' placeholder='image URL 2' 
                value={imageurl2} onChange={(e)=>setimmageurl2(e.target.value)}/>
                <br></br>

                <input type='text' className='form-control' placeholder='image URL 3' 
                value={imageurl3} onChange={(e)=>setimmageurl3(e.target.value)}/>
                <br></br>

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add CLub</button>
                </div>
                <br></br>


            </div>
        </div>

    )
}