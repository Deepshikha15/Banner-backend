const User=require("../models/user-model");
const CryptoJS=require("crypto-js")
const jwt= require("jsonwebtoken")

const userRegistration = async(req, res) => {

    const userData= new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(
            req.body.password,process.env.SECRET_KEY
        ).toString(),
    });
    
    try{
        const user= await userData.save()
        return res.status(201).json(user)
    }catch(e){
        return res.status(500).json(e)
    }

}

const userLogin= async(req,res)=>{
    try {
        const user = await User.findOne({ name: req.body.name });
        !user && res.status(401).json("Wrong password or username");
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const origPassword = bytes.toString(CryptoJS.enc.Utf8);

        origPassword !== req.body.password && res.status(401).json("Wrong password or username");

        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        )

        const { password, ...other } = user._doc;
        return res.status(200).json({...other, accessToken});
    } catch (error) {
        return res.status(500).json(error);
    }
    
}



module.exports = {
    userRegistration,
    userLogin
}