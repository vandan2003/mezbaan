import sequelize from "./dgconfig.js";
import { DataTypes } from "sequelize";

const Rating  = sequelize.define("rating",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Rating:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})

export default Rating;