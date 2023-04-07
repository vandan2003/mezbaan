import { request } from "express";
import { validationResult } from "express-validator";
import {Restaurant,Menu,Image,Facility,Cuisine} from "../model/association.js"
import bcrypt from "bcryptjs";

export const signUp = async (request,response)=>{
   try{
        let errors  = validationResult(request);
        if(!errors.isEmpty())
            return response.status(403).json({status:false,errors});

        request.body.password = await bcrypt.hash(request.body.password,await bcrypt.genSalt(10));
        var result  = await Restaurant.create(request.body);
        return response.status(200).json({status:true,result});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({status:false,error:"Internal Server Error"});
    }
}
