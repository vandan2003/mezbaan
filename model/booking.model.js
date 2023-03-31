import sequelize from "./dgconfig.js";
import {DataTypes} from "sequelize";

const Booking  = sequelize.define("booking",{
    customerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false
    },
    time:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    extraInfo:{
        type:DataTypes.STRING,
        allowNull:true
    },
    bookingAmount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalGuests:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})

sequelize.sync()
.then(res=>{
    console.log("Bookings table created  . . .");
})
.catch(err=>{
    console.log(err);
})

export default Booking;