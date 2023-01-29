import express from 'express';
import mongoose from 'mongoose';
import {notFoundError, errorHandler} from './middlewares/error-handler.js';
import morgan from 'morgan';

import userRoutes from './routes/user.js'
import carRoutes from './routes/car-route.js'
import garageRoutes from './routes/garage-route.js'
import reclamationRoutes from './routes/reclamation-route.js'

const app = express();
const port = process.env.PORT || 3000;
const databaseName = 'Bolt';
const hostname = 'cluster0.d2qq9xh.mongodb.net/test1';

mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb+srv://root:root@cluster0.d2qq9xh.mongodb.net/test1${databaseName}`)
    .then(() => {
            console.log(`Connected to ${databaseName}`);

        }
    )
    .catch(err => {
        console.log(err)
    });

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/img', express.static('public/images'));

app.use((req, res, next) => {
    console.log("Middleware just ran !");
    next();
});

app.use("/gse", (req, res, next) => {
    console.log("Middleware just ran on a gse route !");
    next();
});

app.use('/user', userRoutes);
app.use('/car', carRoutes);
app.use('/garage', garageRoutes);
app.use('/reclamation', reclamationRoutes);


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is up at http://${hostname}:${port}/`);
});
