import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";
const Favourite = sequelize.define("favorite",{
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    timestamps:false
})


sequelize.sync()
.then(res=>{
    console.log("Favourites table created . . .");
})
.catch(err=>{
    cosnole.log(err);
})

export default Favourite;