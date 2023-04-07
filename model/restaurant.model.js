import { DataTypes } from "sequelize";
import sequelize from "./dgconfig.js";


const Restaurant = sequelize.define("restaurant",{
    name:{
        type:DataTypes.STRING,
    allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
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
        allowNull:false,
        unique:true
    },
    openingTime:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    closingTime:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    totalTables:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    rating:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    fssai:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avgCostPer2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lattitude:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    longitude:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"Pending"
    }
},{
    timestamps:false
});

sequelize.sync().then(res=>{
    console.log("Restaurants table created . . .");
})

export default Restaurant;