    //Packages
    const express = require('express')
    const path = require('path')
    const ejs = require('ejs')
    const mongoose = require('mongoose')
    const g2 = require('./models/g2')
    const bcrypt = require('bcrypt')
    const session=require('express-session')
    const flash = require('connect-flash');
    const Appointment=require('./models/appointment')
    const Usermodel=require('./models/g2')

    //initialize express
    const app = new express()
    app.use(express.static('public'))

    //set templating engine
    app.set('view engine', 'ejs')
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(session({
        'secret':'this is vijay'
    }))
    app.use("*",(req,res,next)=>{
        if(req.session.userId){
            loggedIn=req.session.userId
            userTypeLogged=req.session.userType
        }
        else{
            loggedIn=null
            userTypeLogged='Driver'
        }
        next();
    })
    app.use(flash())
    
    //Controller
    const homeController = require('./controllers/home');
    const gController = require('./controllers/g')
    const g2Controller = require('./controllers/g2')
    const loginController = require('./controllers/login')
    const logoutController = require('./controllers/logout')
    const g2DetailsController = require('./controllers/g2Details')
    const g2FetchInfoController = require('./controllers/g2FetchInfo')
    const g2UpdateController = require('./controllers/g2Update')
    const authLoginController = require('./controllers/authLogin')
    const authSignupController = require('./controllers/authSignup')
    const g2testBookController=require('./controllers/getG2Details')
    // const getG2DetailsController = require('./controllers/getG2Details')
    // const getGDetailsController = require('./controllers/getGDetails')
    // const getAppointmentController= require("./controllers/getAppointment");
    // const postAppointmentController= require("./controllers/postAppointment");

    const appointmentController = require('./controllers/appointmentController');

    //Middleware Custom
    const authMiddleware=require('./middlewares/authMiddleware');
    const loggedInMiddleware = require('./middlewares/loggedInMiddleware');
    const redirectIfAuthenticatedMiddleware=require('./middlewares/redirectIfAuthenticatedMiddleware')

    global.loggedIn=null
    global.userTypeLogged=null

    //for connection
    mongoose.connect('mongodb+srv://admin:admin@cluster0.ewy2f5l.mongodb.net/g2Test?retryWrites=true&w=majority&appName=Cluster0')

    //server & port
    app.listen(1906, () => {
        console.log('App is listening at port 1906')
    })

    //home page
    app.get('/', homeController)

    //G page
    app.get('/g', gController, authMiddleware)

    //G2 page
    app.get('/g2', g2Controller, authMiddleware)

    app.post('/g2/details', g2DetailsController)

    app.post('/g/fromg2', g2FetchInfoController)

    app.post('/g2/update', g2UpdateController)

    app.post('/auth/login', authLoginController)

    app.post('/auth/signup' , redirectIfAuthenticatedMiddleware,authSignupController)

    //appointment
    app.get("/appointments", (req, res) => {
        res.render('appointment', { errors: req.flash('errors') });
      });
      
      app.post('/appointments/create', appointmentController.createAppointment);


      app.post('/g2_test/book',g2testBookController);

      app.get('/g2',async (req, res) => {
        try {
          const { date } = req.query;
          const availableDates = await Appointment.distinct('date', { isTimeSlotAvailable: true });
      
          let availableSlots = [];
          if (date) {
            const appointments = await Appointment.find({ date, isTimeSlotAvailable: true });
            availableSlots = appointments.map(appointment => appointment.time);
          }
      
          res.render('g2', { availableSlots, availableDates, selectedDate: date || '' });
        } catch (error) {
          console.error('Error fetching available time slots:', error);
          res.status(500).send('Internal Server Error');
        }
      })

    //login
    app.get('/login',  redirectIfAuthenticatedMiddleware,loginController)

    //logout
    app.get('/logout', logoutController)
    