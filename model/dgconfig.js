import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Mezbaan","root","vijay222003",{
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