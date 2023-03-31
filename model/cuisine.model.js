import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Cuisine = sequelize.define("cuisine",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cuisine:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("cuisines table created  . . .");
})

.catch(err=>{
    console.log(err);
})

export default Cuisine;