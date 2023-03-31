import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Menu = sequelize.define("menu",{
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    menu:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

sequelize.sync()
.then(res=>{
    console.log("Menus table created  . . .");
})

.catch(err=>{
    console.log(err);
})

export default Menu;