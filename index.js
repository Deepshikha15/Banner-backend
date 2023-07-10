const express = require('express')
const bodyParser = require('body-parser')
var multer = require('multer');
const app = express()
const db = require('./db')
const collection = require("./models/user-model")
const cors = require("cors")
const jwt= require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const bcryptjs = require("bcryptjs")
const sessions = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }))
// 
app.use(bodyParser.json())
app.use(express.json({ strict: false }))
app.use(cookieParser())


app.use(express.urlencoded({ extended: true }))
app.use(cors())
const dotenv = require('dotenv')


dotenv.config();
const Records = require('./models/record-model');


const recordRouter = require('./routes/record-router')


const apiPort = 4000



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', recordRouter)

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: "secret",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));

// async function hashPass(password){
//     const res= await bcryptjs.hash(password,10)
//     return res
// }
// async function compare(userPass,hashPass){
//     const res= await bcryptjs.hash(userPass,hashPass)
//     return res
// }

// app.get('/login',cors(),(req,res)=>{
//     console.log("sess",req.session)
    
//     if(req.cookies.availableCookie){
//         const verify=jwt.verify(req.cookies.availableCookie,"qwertyuiopasdfghjklzxcvbnmqwertyuiopiopasdfghjklzxcv" )
//         res.json({name:verify.name})
//     }else{
//         res.json("cookie not verified")
//     }
//     req.session.save();
    
//     return res.json("user logged in")
// })

// app.get('/logout',cors(),(req,res)=>{
//     console.log("logg outt===========",res.session);
//     req.session.destroy();
   

//     return res.json("user logged out")
// })

// app.post("/login",async(req,res)=>{
//     const{name,password}=req.body
    
//     try{
//         const check=await collection.findOne({name:name})
//         const passCheck= await compare(password, check.password)

//         if(check && passCheck){
//             // res.cookie("availableCookie",check.token,{
//             //     maxAge:600000,
//             //     httpOnly:true
//             // })

//             req.session.save();
//             console.log("logg inn===========",req.session)
//             res.json("notexist")
//         }
//         else{
//             res.json("exist")
            
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })

// app.post('/register',async(req,res)=>{
//     const token= jwt.sign({name:req.body.name},"qwertyuiopasdfghjklzxcvbnmqwertyuiopiopasdfghjklzxcv")
    
//     const {name, email,password}= req.body
//     const data={
//         name:name,
//         email:email,
//         password: await hashPass(password),
//         token:token
//     }
//     try{
//         const check= await collection.findOne({name:name})
//         console.log("ishhhh ",check)
//         if(check){
//             res.json("exist")
//         }else{
//             // res.cookie("availableCookie",token,{
//             //     maxAge:600000,
//             //     httpOnly:true
//             // })
//             res.json("notexist")
//             await collection.insertMany([data])
//         }

//     }catch(e){
//         res.json("fail")
//     }  
// })




app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))