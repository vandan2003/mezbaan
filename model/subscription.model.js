import sequelize  from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Subscription  = sequelize.define("Subscription",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    planId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    startingDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    endingDate:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("subscriptions table created . . . ");
})
.catch(err=>{
    console.log(err);
})

export default Subscription;