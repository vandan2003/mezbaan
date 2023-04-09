import Admin from "../model/admin.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = async (request, response, next) => {
  try {
    console.log("== == == == == == == == == == == == == ==");
      let admin = await Admin.findOne({raw: true,
          where: {
              email: request.body.email
          }
      });
      if(admin){
          let status = await bcrypt.compare(request.body.password, admin.password);
          if (status){
              let payload = {subject: admin.email};
              let token = jwt.sign(payload,'fdfxvcvnreofdfdffgfhhghtryrthfvbhvghrevvvcrerer');
               
              return response.status(200).json({ message: "Admin Signin Successfully...........", token: token,status: true });
          }
          return response.status(400).json({ error: "Bad request", status: false });
      }
  }
  catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const signOut = async (request, response, next) => {
  try {
    let admin = await Admin.findOne({raw: true,
      where: {
          email: request.body.email
      }
  });
    let payload = { subject: admin.email };
    let token = jwt.sign(payload,'fdfxvcvnreorevvvcrerer');      

    return response.status(200).json({ status: true, message: "Admin Signout successfully........", token: token,status: true });  

  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const viewProfile = async (request, response, next) => {
    try {
      const adminId = request.params.id;
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return response.status(404).json({ error: "Admin not found", status: false });
      }
      await admin.save();
      return response.status(200).json({ admin: admin, status: true });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
} 

export const editProfile = async (request, response, next) => {
    try {
      const adminId = request.params.id;
      const admin = await Admin.findByPk(adminId);
      if (!admin) {

        return response.status(404).json({ error: "Admin not found", status: false });
      } 
      
      admin.email = request.body.email;
      await admin.save();
      console.log(admin);
      return response.status(200).json({ admin:admin, message: "Admin Profile updated successfully......", status: true });
    } catch (err){
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const changePassword = async (request, response, next) => {
    try {
      const adminId = request.params.id;
      const { oldPassword, newPassword, confirmPassword } = request.body;
      console.log(request.body);
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return response.status(404).json({ error: "Admin not found", status: false });
      }
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return response.status(401).json({ error: "Incorrect password", status: false });
      } 
      if (newPassword !== confirmPassword) {
        return response.status(400).json({ error: "Passwords do not match", status: false });
      }
      let saltKey = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(newPassword, saltKey);
      admin.password = encryptedPassword;
      await admin.save();
      return response.status(200).json({ status: true, message: "Password changed successfully" });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
 
