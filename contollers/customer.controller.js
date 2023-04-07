import Customer from "../model/Customer.model.js"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/tokenVerification.js";
import Favourite from "../model/favourite.model.js";


export const signup = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let customer = await Customer.create(request.body);
        return response.status(200).json({ customer: customer, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signin = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({raw: true,
            where: {
                email: request.body.email
            }
        });
        if (customer) {
            let status = await bcrypt.compare(request.body.password, customer.password);
            if (status){
                let payload = {subject: customer.email};
                let token = jwt.sign(payload,'mvncvbmbmvb,vbbv,bbbbbbbbcnn');      
                return response.status(200).json({ message: "Sign in success", token: token,status: true });
            }
            return response.status(400).json({ error: "Bad request", status: false });
        }
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const getCustomer = (request,response,next)=>{
    Customer.findByPk(request.params.id,{raw: true})
    .then(result=>{
        return response.status(200).json({customer: result, status: true});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Intrnal Server Error", status: false});
    })
}

export const update = async(request,response,next) => {
    try{   
       const customer = await Customer.findByPk(request.body.id,{raw: true});
       if(!customer)
          return response.status(404).json({error: "Requested resource not found.",status: false});
       
       await Customer.update(
        {name: request.body.name,email: request.body.email,contact: request.body.contact},{
           where:{id: request.body.id}
       });
       return response.status(200).json({message: "Cusatomer updated", 
       customer: {...customer,name: request.body.categoryName,email: request.body.email,contact: request.body.contact},
       status: true});
    }
    catch(err){
       return response.status(500).json({error: "Internal Server Error", status: false});
    } 
}

export const block = async  (request,response,next)=>{
    try{
        const customer = await Customer.findByPk(request.params.id,{raw: true});
       if(!customer)
            return response.status(404).json({error: "Requested resource not found.",status: false});
        await Customer.update(
            {status: "block"},{
            where:{id: request.params.id}
        });
       return response.status(200).json({message: "Cusatomer blocked", 
       customer: {...customer,name: request.body.categoryName,email: request.body.email,contact: request.body.contact},
       status: true});
    }
    catch(err){
        return response.status(500).json({error: "Internal Server Error", status: false});
    }
}

export const changePassword = async (request, response, next) => {
    try {
      const id = request.params.id;
      const { oldPassword, newPassword, confirmPassword } = request.body;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return response.status(404).json({ error: "Requested resource not found", status: false });
      }
      const isMatch = await bcrypt.compare(oldPassword, customer.password);
      if (!isMatch) {
        return response.status(401).json({ error: "Old Password Incorrect", status: false });
      }
      if (newPassword != confirmPassword) {
        return response.status(400).json({ error: "Passwords do not match", status: false });
      }
      let saltKey = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(newPassword, saltKey);
      customer.password = encryptedPassword;
      await customer.save();
      return response.status(200).json({ status: true, message: "Password changed successfully" });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
  }

export const addToFavourite = async (request,response,next)=>{
    let record= await Favourite.findOne({raw:true,
        where:{
            restaurantId:request.params.resId,
            customerId:3
        }
    })
    if(record)
        return response.status(200).json({ message: "alredy added",status: true });
    let favourite =await Favourite.create({restaurantId :request.params.resId,customerId:3});
    return response.status(200).json({ favourite : favourite , status: true });
}

export const romoveFavourite = async (request,response,next)=>{
    let record= await Favourite.destroy({raw:true,
        where:{
            restaurantId:request.params.resId,
            customerId:1
        }
    })
    if(record)
    return response.status(200).json({ message : "favourite is removed" , status: true });
    return response.status(200).json({ message : "favourite is not removed" , status: false });
}

