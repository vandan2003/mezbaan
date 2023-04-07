// import Review from "./review.model.js";
import Customer from "./Customer.model.js";
import Review from './review.model.js';
import Restaurant from "./restaurant.model.js";
import Favourite from "./favourite.model.js";
import Booking from "./booking.model.js";
import Subscription from "./subscription.model.js";
import Menu from "./menu.model.js";
import Facility from "./Facility.model.js";
import Image from "./image.model.js";
import Cuisine from "./cuisine.model.js";
import Plan from "./plan.model.js";
import Rating from "./rating.model.js";

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


Restaurant.hasMany(Subscription,{
    foreignKey:'restaurantId'
});

Subscription.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});

Plan.hasMany(Subscription,{
    foreignKey:'planId'
});

Subscription.belongsTo(Plan,{
    foreignKey:'planId' , targetKey:'id'
});


Restaurant.hasMany(Menu,{
    foreignKey:'restaurantId'
});

Menu.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});

Restaurant.hasMany(Image,{
    foreignKey:'restaurantId'
});

Image.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});


Restaurant.hasMany(Facility,{
    foreignKey:'restaurantId'
});

Facility.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});


Restaurant.hasMany(Cuisine,{
    foreignKey:'restaurantId'
});

Cuisine.belongsTo(Restaurant,{
    foreignKey:'restaurantId' , targetKey:'id'
});

Restaurant.hasMany(Rating,{
    foreignKey:"restaurantId"
})

Rating.belongsTo(Restaurant,{
    foreignKey:"restaurantId",targetKey:"id"
})

Customer.hasMany(Rating,{
    foreignKey:"customerId"
})

Rating.belongsTo(Customer,{
    foreignKey:"customerId",targetKey:"id"
})

export {Restaurant,Review,Customer,Favourite,Booking,Plan,Subscription,Menu,Facility,Cuisine,Image,Rating};