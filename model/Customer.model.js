import { DataTypes } from "sequelize";
import sequelize from "./dgconfig.js";


const Customer = sequelize.define("customer",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("Customers Tables created  . . .");
})
.catch(err=>{
    console.log(err);
})

export default Customer;