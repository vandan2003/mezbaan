import { DataTypes } from "sequelize";
import sequelize from "./dgconfig.js";

const Admin = sequelize.define("admin",{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("Admins tables created . . .");
})
.catch(err=>{
    console.log(errr);
})

export default Admin;