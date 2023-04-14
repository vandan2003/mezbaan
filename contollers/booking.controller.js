import { request, response } from "express";
import Booking from "../model/booking.model.js"


export const confirm  = (request,response)=>{
    Booking.create(request.body)
    .then(res=>{
        return response.status(200).json({status:true,res,msg:"Booking Success"});
    })
    .catch(err=>{
        return response.status(500).json({status:false,err,msg:"Something Went wrong"});
    })
}

export const cancel = (request,response)=>{
    Booking.update({status:"Cancelled"},{where:{id:request.params.bkgId}})
    .then(res=>{
        console.log(res);
        return response.status(200).json({status:true,res,msg:"Booking Cancel"})
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:fasle,err,msg:"Something Went Wrong"});
    })
}

export const history = (request,response)=>{
    Booking.findAll({where:{customerId:request.body.customerId}})
    .then(res=>{
        if(!res.length)
            return response.status(404).json({status:false,err:"No History Available"});
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err,msg:"Something Went Wrong"});
    })
}

export const historyRest = (request,response)=>{
    Booking.findAll({where:{restaurantId:request.params.id}})
    .then(res=>{
        if(!res.length)
            return response.status(404).json({status:false,err:"No History Available"});
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err,msg:"Something Went Wrong"});
    })
}