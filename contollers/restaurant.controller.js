import { request, response } from "express";
import { validationResult } from "express-validator";
import {Restaurant,Menu,Image,Facility,Cuisine,Rating} from "../model/association.js"
import bcrypt from "bcryptjs";
import sequelize from "../model/dgconfig.js";
import { sendOtp } from "./mailService.js";
import jwt from "jsonwebtoken";

export const signUp = async (request,response)=>{
    console.log(request.body)
    let transaction  = await sequelize.transaction();
   try{
        let errors  = validationResult(request);
        console.log(request.body);
        if(!errors.isEmpty())
            return response.status(403).json({status:false,errors});
        request.body.password = await bcrypt.hash(request.body.password,await bcrypt.genSalt(10));
        var restaurant = await Restaurant.create(request.body,{transaction});

        var imgResult,menuResult;
        
         var promises = request.files.map(async (img,index)=>{
            if(img.fieldname == 'images'){
                imgResult = await Image.create({restaurantId:restaurant.id , image:img.filename},{transaction})
            }
            else{
                menuResult = await Menu.create({restaurantId:restaurant.id , menu:img.filename},{transaction})
            }
            
        })

        promises.concat(
            request.body.facilities.map(async(facility,index)=>{
                await Facility.create({restaurantId:restaurant.id,facility:facility},{transaction})
            })
        )

        promises.concat(
            request.body.cuisines.map(async(cuisine,index)=>{
                await Cuisine.create({restaurantId:restaurant.id,cuisine:cuisine},{transaction})
            })
        )
        
        Promise.all(promises)
        .then(res=>{
            transaction.commit();
            return response.status(200).json({status:true,restaurant,imgResult,menuResult});
        })
    }
    catch(err){
        transaction.rollback();
        console.log(err);
        return response.status(500).json({status:false,error:"Internal Server Error"});
    }
}

export const signUpPage = (request,response)=>{
    response.render("addRestaurant.ejs");
}

export const signIn = async (request,response)=>{
   try{
       var rest =  await Restaurant.findOne({
            where:{
               
                    email:request.body.email,
            }
        });

        if(!rest){  
            return response.status(400).json({status:false,error:"Nor Restaurant Found"});
        }
        var status = await bcrypt.compare(request.body.password,rest.password);
        if(status){
            let payload = {subject: rest.email};
            let token = jwt.sign(payload,'fdfxvcvnreorevvvcrerer');   
            return response.status(200).json({status:true,token,result:"Sign In Success"})
        }
        return response.status(400).json({status:false,error:"Wrong Password"});
   }
   catch(err){
    console.log(err);
    return response.status(500).json({error:"Internal Server Error"});
   }
}

export const list = (request,response)=>{
    Restaurant.findAll()
    .then(res=>{
        if(!res.length)
            return response.status(404).json({status:false,err:"NOt available"});
        return response.status(200).json({status:true,res})
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err:"Internal Serber Error"})
    })
}

export const block = async (request,response)=>{
   Restaurant.update({
    status:"BLOCKED"
   },{
    where:{id:request.body.params.id}
   })
}

export const deny = async (request,response)=>{
    Restaurant.update({
     status:"Denied"
    },{
     where:{id:request.body.params.id}
    })
}

export const verify = async (request,response)=>{
    Restaurant.update({
     status:"Active"
    },{
     where:{id:request.body.params.id}
    })
}

export const addImage = async (request,response)=>{
    
    const transaction = await sequelize.transaction();
    try{
        var promises = request.files.map(async (img,index)=>{
            await Image.create({restaurantId:request.body.restaurantId,image:img.filename});
        })
 
         await Promise.all(promises) 
        transaction.commit();
        return response.status(200).json({status:true,res});
    }
    catch(err){
     console.log(err)
     transaction.rollback();
     return response.status(500).json({status:false,err});
    }
}

export const addMenu = async (request,response)=>{
    const transaction = await sequelize.transaction();
    try{
         var promises = request.files.map(async (img,index)=>{
             await Image.create({restaurantId:request.body.restaurantId,image:img.filename},{transaction});
         })
 
         await Promise.all(promises) 
        transaction.commit();
        return response.status(200).json({status:true,res});
    }
    catch(err){
     console.log(err)
     transaction.rollback();
     return response.status(500).json({status:false,err});
    }
}

export const addFacilities  = async (request,response)=>{
    try{
        var promises = request.body.facilities.map(async(facility,index)=>{
            await Facility.create({restaurantId:request.body.restaurantId,facilities:facility},{transaction})
        })
 
         await Promise.all(promises) 
        transaction.commit();
        return response.status(200).json({status:true,res});
    }
    catch(err){
     console.log(err)
     transaction.rollback();
     return response.status(500).json({status:false,err});
    }
}

export const addCuisines  = async (request,response)=>{
    try{
        var promises = request.body.cuisines.map(async(cuisine,index)=>{
            await Cuisine.create({restaurantId:request.body.restaurantId,cuisine:cuisine},{transaction})
        })
 
         await Promise.all(promises) 
        transaction.commit();
        return response.status(200).json({status:true,res});
    }
    catch(err){
     console.log(err)
     transaction.rollback();
     return response.status(500).json({status:false,err});
    }
}

export const removeMenu = (request,response)=>{
    Menu.destroy({
        where:{
            id:request.params.id
        }
    })
    .then(res=>{
        return response.status(200).json({res,status:true});
    })
    .catch(err=>{
        return response.status(500).json({err,status:false});
    })
}

export const removeImage = (request,response)=>{
    Image.destroy({
        where:{
            id:request.params.id
        }
    })
    .then(res=>{
        return response.status(200).json({res,status:true});
    })
    .catch(err=>{
        return response.status(500).json({err,status:false});
    })
}

export const removeFacility = (request,response)=>{
    Facility.destroy({
        where:{
            id:request.params.id
        }
    })
    .then(res=>{
        return response.status(200).json({res,status:true});
    })
    .catch(err=>{
        return response.status(500).json({err,status:false});
    })
}

export const removeCuisine = (request,response)=>{
    Cuisine.destroy({
        where:{
            id:request.params.id
        }
    })
    .then(res=>{
        return response.status(200).json({res,status:true});
    })
    .catch(err=>{
        return response.status(500).json({err,status:false});
    })
}

export const profile = async (request,response)=>{
    try{
        var rest = await Restaurant.findOne({
            where:{
                id:request.params.id
            }
        });

        var img = await Image.findAll({
            where:{
                restaurantId:request.params.id
            }
        })

        var menu = await Menu.findAll({
            where:{
                restaurantId:request.params.id
            }
        })

        var facilities = await Facility.findAll({
            where:{
                restaurantId:request.params.id
            }
        })

        var cuisines = await Cuisine.findAll({
            where:{
                restaurantId:request.params.id
            }
        })

        if(!rest)
            return response.status(404).json({status:false,res:"No Restaurant available"})
        Promise.all(img.concat(menu).concat(facilities).concat(cuisines))
        .then(res=>{
            return response.status(200).json({rest,res});
        })
   }
   catch(err){
    return response.status(500).json({err});
   }
}

export const changePasswordPage = async (request,response)=>{
    try{
        var restaurant = await Restaurant.findOne({
            where:{
                id:request.body.restaurantId
            }
        });

        if(!restaurant)
            return response.status(404).json({status:false,res:"Restaurant not found"});
        var otp = Math.floor(1000 + Math.random() * 9000);
        sendOtp(restaurant.email,otp);
        return response.status(200).json({status:true,otp})
    }
    catch(err){
        return response.status(500).json({sttus:false,err});
    }
}

export const changePassword = async (request,response)=>{
    try{
        var restaurant = await Restaurant.findOne({
            where:{
                id:request.body.restaurantId
            }
        });

        if(!restaurant)
            return response.status(404).json({status:false,res:"Restaurant not found"});
        await Restaurant.update({password: await bcrypt.hash(request.body.newPassword,await bcrypt.genSalt(10))},{
            where:{
                id:restaurant.id
            }
        })
        return response.status(200).json({status:true,res:"Password Changed Successfully"})
    }catch(err){
        return response.status(500).json({status:false,err});
    }
}

export const rate = async (request,response)=>{
    try{
       var rating = await Rating.create(request.body);

       var allratings = await Rating.findAll({where:{restaurantId:request.body.restaurantId}});
       let sum = 0 ;
       allratings.map((rate)=>{
            sum+= rate.Rating;
       })
        return response.status(200).json({status:true,res:await Restaurant.update({rating:((sum/allratings.length)/20).toFixed(1)},{where:{id:request.body.restaurantId}})})
    }
    catch(err){
        return response.status(500).json({status:false,err});
    }
} 