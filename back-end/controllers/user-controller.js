import { register as registerUser , login as loginUser} from "../services/user-service.js";

export const login = async (req, res)=>{
    const userObject = req.body;
    try{
    const obj = await loginUser(userObject);
    res.status(200).json(obj);
    }
    catch(err){
             res.status(500).json({message: 'Login Fail Server Crash...'});
             console.log(err);
    }
}
export const register = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data rec ", data);
    const response = await registerUser(data); 
    res.status(201).json(response);
  } catch (err) {
    console.error("Caught in Controller ---> ", err.message);
    
    if (err.message === "Email is already registered.") {
      return res.status(409).json({ message: err.message }); 
    }

    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

export const profile = (req, res)=>{
    res.json({message:'Profile '});
}