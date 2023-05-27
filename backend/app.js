const Express=require('express')
const Mongoose=require('mongoose')
const Bodyparser=require('body-parser')
const Cors=require('cors')
const {otpModel}=require("./models/otp")

var nodemailer = require('nodemailer');


const app=Express()

app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use(Cors())

//mongoose connection

Mongoose.connect("mongodb+srv://saranyaa365:Aayushi%402019@cluster0.q7fitnq.mongodb.net/OtpDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post("/",async(req,res)=>{
    let data= new otpModel({
        email: req.body.email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000
    })
    let result= await data.save()
    //res.json(result)
    // res.send("Book entry test")
     res.json({"status":"success","data":result})

})

app.get('/',(req,res) =>{
    res.send('server is running')
})

app.get('/mail',async (req,res) =>{

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'audra.purdy75@ethereal.email',
            pass: 'ABznTfknTGMtVKG4Gm'
        }

    });
    let info = await transporter.sendMail({
        from: '"Saranya" <saranyaa365@gmail.com>',
        to: "saranya.anandakumari@gmail.com",
        subject: "hello testing",
        html: "<b>Hello World</b>"
    });
    res.json(info)

    
})


app.get('/sendmail/:email',async (req,res) =>{
        
    let mailTransporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'saranyaa365@gmail.com',
            pass:'bxdtqbyfedatgsqd'
        }
    })

    let details = await mailTransporter.sendMail({
        from:'from mail enter here', 
        to: req.params.email,
        subject:'Subject',
        html: "<b>Hello World</b>"
    });
    res.json(details)
    

})

app.listen(3001,()=>{
    console.log("App is running")
})