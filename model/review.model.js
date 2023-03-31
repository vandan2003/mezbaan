import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Review  = sequelize.define("review",{
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    review:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false
    },
    time:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("Reviews table created . . .");
})
.catch(err=>{
    console.log(err);
})

export default Review;