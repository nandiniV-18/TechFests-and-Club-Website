const express = require("express");

const router = express.Router();

const Booking = require("../models/booking")
const moment = require("moment")
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51My8sfSI8YvYoZIMIymHdwgpYFgFyarKlijdqC3h4vbxZ05Mbo2J26xBFpFzsYqeF4uHHSDPXKMb4gDGXagaboN2008UkhMjcy');
const Room = require("../models/room")

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        // token
    } = req.body

    // try {

    //     const customer = await stripe.customers.create({
    //         email: token.email,
    //         source: token.id
    //     })
    //     const payment = await stripe.charges.create(
    //         {
    //             amount: totalamount * 100,
    //             customer: customer.id,
    //             currency: 'inr',
    //             receipt_email: token.email
    //         }, {
    //         idempotencyKey: uuidv4()

    //     }
    //     )
    //     if (payment) {
    //         try {
    //             const newbooking = new Booking({
    //                 room: room.name,
    //                 roomid: room._id,
    //                 userid,
    //                 fromdate,
    //                 todate,
    //                 totalamount,
    //                 totaldays,
    //                 transactionId: '1234'
    //             })
    //             const booking = await newbooking.save()


    //             const roomtemp = await Room.findOne({ _id: room._id })

    //             roomtemp.currentbookings.push({
    //                 bookingid: booking._id,
    //                 fromdate: fromdate,
    //                 todate: todate,
    //                 userid: userid,
    //                 status: booking.status
    //             });
    //             await roomtemp.save()

    //             res.send('Room Booked Successfully')
    //         }
    //         catch (error) {
    //             console.log(':::::::::::::::::errors::::::::::::')
    //             return res.status(400).json({ error })
    //         }



    //     }

    //     res.send("Payement Successful , Your Room is BOOKED")



    // } catch (error) {
    //     return res.status(400).json({ error });

    // }















    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '1234'
        })
        const booking = await newbooking.save()


        const roomtemp = await Room.findOne({ _id: room._id })

        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: booking.status
        });
        await roomtemp.save()

        res.send('Room Booked Successfully')

        // alert('Congratulations Room booked Successfully')
    }
    catch (error) {
        console.log(':::::::::::::::::errors::::::::::::')
        return res.status(400).json({ error })
    }







});




router.post("/getbookingsbyuserid",async(req,res)=>{
    const userid=(req.body.userid)
    try {
        const bookings= await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error});
    }
});


router.post("/cancelbooking",async(req,res)=>{
    const {bookingid,roomid}=req.body
    // const bookingid=(req.body.userid)
    // const roomid=(re)

    try {
        const bookingitem=await Booking.findOne({_id:bookingid})
        bookingitem.status='cancelled'
        await bookingitem.save()
        const room= await Room.findOne({_id : roomid})

        const bookings = room.currentbookings


        const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid) 
        room.currentbookings=temp
 
        await room.save()
        res.send("YOUR BOOKING CANCELLED SUCCESFULLY")

    } catch (error) {
        console.log("hehehhe mai toh idhar")

        return res.status(400).json({error})
        
    }
})



router.get("/getallbookings" ,async(req,res)=>{
    try {
        const bookings=await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.send.status(400).json({error})
    }
})

module.exports = router;
