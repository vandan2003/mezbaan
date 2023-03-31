import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Image = sequelize.define("image",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("Images table created  . . .");
})

.catch(err=>{
    console.log(err);
})

export default Image;