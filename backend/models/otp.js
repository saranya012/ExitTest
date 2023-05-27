const Mongoose=require('mongoose')

let OtpSchema=Mongoose.Schema(
    {
        email:String,
        code:Number,
        expireIn : TimeRanges        
    }
)

var otpModel=Mongoose.model("otp", OtpSchema)
module.exports={otpModel}