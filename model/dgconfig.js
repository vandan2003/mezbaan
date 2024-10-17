import { Sequelize } from "sequelize";
import config from "../config/index.js";

const sequelize = new Sequelize("test",config.DATABASE_USERNAME,config.DATABASE_PASSWORD,{
    host:'localhost',
    dialect:"mysql"
});

sequelize.authenticate()
.then(res=>{
    console.log("Database Connected");
})
.catch(err=>{
    console.log(err);
})

export default sequelize;