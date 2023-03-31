// import Review from "./review.model.js";
import Customer from "./Customer.model.js";
import Review from './review.model.js';
import Restaurant from "./restaurant.model.js";
import Favourite from "./favourite.model.js";
import Booking from "./booking.model.js";

Customer.hasMany(Review,{
    foreignKey:'customerId'
})

Review.belongsTo(Customer,{
    foreignKey:'customerId' , targetKey:'id'
});

Restaurant.hasMany(Review,{
    foreignKey:'restaurantId'
})

Review.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});

Customer.hasMany(Favourite,{
    foreignKey:'customerId'
})

Favourite.belongsTo(Customer,{
    foreignKey:'customerId' , targetKey:'id'
});

Restaurant.hasMany(Favourite,{
    foreignKey:'restaurantId'
})

Favourite.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});

Customer.hasMany(Booking,{
    foreignKey:'customerId'
})

Booking.belongsTo(Customer,{
    foreignKey:'customerId' , targetKey:'id'
});

Restaurant.hasMany(Booking,{
    foreignKey:'restaurantId'
})

Booking.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});





export {Review,Customer,Favourite,Booking};