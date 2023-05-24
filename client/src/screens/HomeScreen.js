import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import 'antd/dist/reset.css';
import Error from '../components/Error';
import moment from 'moment'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function HomeScreen() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()


    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicaterooms, setduplicaterooms] = useState([])

    const[searchkey,setsearchkey]=useState('')
    const[type,settype]=useState('all')



    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                setrooms(data)
                setduplicaterooms(data)
                setloading(false)
            } catch (error) {
                seterror(true)
                console.error(error);
                setloading(false)
            }
        }
        fetchData();

    }, []);

    function filterByDate(dates) {

        //from date

        console.log(dates[0].format("DD-MM-YYYY"));

        setfromdate(dates[0].format("DD-MM-YYYY"));

        //to date

        console.log(dates[1].format("DD-MM-YYYY"));

        settodate(dates[1].format("DD-MM-YYYY"));

        const firstdate1 = dates[0].format("DD-MM-YYYY")
        const lastdate1 = dates[1].format("DD-MM-YYYY")

        // console.log(firstdate1)
        // console.log(lastdate1)
        //tempRooms

        var tempRooms = [];



        for (const room of duplicaterooms) {

            var availability = false;



            if (room.currentbookings.length > 0) {

                for (const booking of room.currentbookings) {

                    //check between or equal to dates
                    var compareDate1 = moment(firstdate1, "DD/MM/YYYY");
                    var compareDate2 = moment(lastdate1, "DD/MM/YYYY");
                    var startDate = moment(booking.fromdate, "DD/MM/YYYY");
                    var endDate = moment(booking.todate, "DD/MM/YYYY");

                    if (

                        !(compareDate1.isBetween(startDate, endDate))
                        &&
                        !(compareDate2.isBetween(startDate, endDate))

                    ) {



                        if (

                            dates[0].format("DD-MM-YYYY") !== booking.fromdate &&

                            dates[0].format("DD-MM-YYYY") !== booking.todate &&

                            dates[1].format("DD-MM-YYYY") !== booking.fromdate &&

                            dates[1].format("DD-MM-YYYY") !== booking.todate

                        ) {

                            availability = true;

                        }

                    }

                }

            } else {

                availability = true;

            }



            if (availability === true) {

                tempRooms.push(room);

            }

        }



        setrooms(tempRooms);

    }

    function filterBySearch(){
        const temprooms =duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setrooms(temprooms)
    }
    function filterByType(e){
        settype(e)
        if(e!=='all'){
            const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
        setrooms(temprooms)
        }
        else{
            setrooms(duplicaterooms)
        }
    }

    return (
        <div className='container'>


            <div className='row mt-3 bs'>
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

                </div>
                <div className='col-md-5 mt-2'>
                    <input type='text' className='form-control' placeholder='search club'
                    value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch} />
                </div>
              <div className='col-md-3 mt-2'>
              <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value='all'>All</option>
                    <option value='technical'>Technical</option>
                    <option value='non-technical'>Non Technical</option>
                </select>
              </div>


            </div>



            <div className="row justify-content-center mt-5">
                {loading ? (<Loader />
                ) : (
                    rooms.map(rooms => {
                        return <div className="col-md-9 mt-3">
                            <Room room={rooms} fromdate={fromdate} todate={todate} />
                        </div>;
                    })
                ) }
            </div>

        </div>
    )
}

export default HomeScreen