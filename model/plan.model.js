import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Plan = sequelize.define("plan",{
    planName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    duration:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})

sequelize.sync()
.then(res=>{
    console.log("Plans table created  . . .");
})
.catch(err=>{
    console.log(err);
});

export default Plan;