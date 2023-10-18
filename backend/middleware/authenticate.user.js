const jwt = require("jsonwebtoken");
const { LogoutModel } = require("../model/logout.model");

const authenticate = async(req, res, next) => {
  const token = req.headers.authorization;
  try {

    let findToken = await LogoutModel.find({token:token})
    if(findToken.length>0){
      return res.send("You have to login first")
    }
    
    if(token){
        jwt.verify(token,"ALPHA",(err,decoded)=>{
            if(err){
                res.send(err)
            }else{
                next()
            }
        })
    }else{
        res.send("Please provide Token!!")
    }
  } catch (error) {
    console.log(error);
    res.send("Error in user authenticate middleware route");
  }
};

module.exports = {
    authenticate
}