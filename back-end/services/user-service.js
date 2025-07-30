import { UserModel } from "../models/user-model.js";
import { compareHash, encryptPassword } from "../utils/services/password-hash.js";
import { generateToken } from "../utils/services/token.js";

export const register = async (userObject) => {
  try {
    userObject.password = encryptPassword(userObject.password);
    const doc = await UserModel.create(userObject);
    if (doc && doc._id) {
      return "User Registered Successfully";
    }
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      throw new Error("Email is already registered.");
    }
    throw err;
  }
};

export const login = async (userObject)=>{
   try{
    const doc =  await UserModel.findOne({email:userObject.email}).exec();
   if(doc && doc.email){
        if(compareHash(userObject.password, doc.password)){
            const token = generateToken(doc.email);
            return {message:"Welcome "+doc.name,role:doc.role, token : token};
        }
        else{
            return {message:"Invalid Email or Password"};
        }
   }
   else{
         return "Invalid Email or Password";
   }
}
catch(err){
    throw new Error("Invalid User Credentials");
}
}