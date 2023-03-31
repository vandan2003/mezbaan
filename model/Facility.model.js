import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Facility = sequelize.define("facility",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    facility:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("facilities table created  . . .");
})

.catch(err=>{
    console.log(err);
})

export default Facility;