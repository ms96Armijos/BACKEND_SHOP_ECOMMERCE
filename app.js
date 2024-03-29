const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv/config");
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');


const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

//MIDDLEWARE
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


const categoriesRouter = require('./routers/categories');
const productRouter = require('./routers/products');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/orders');



app.use(`${api}/categories`,categoriesRouter );
app.use(`${api}/products`,productRouter );
app.use(`${api}/users`,userRouter );
app.use(`${api}/orders`,orderRouter );



mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Database Connection is ready...");
    })
    .catch((err) => {
        console.log(err);
    });



    


app.listen(3000, () => {
    console.log(api);
    console.log("server is running localhost");
});
