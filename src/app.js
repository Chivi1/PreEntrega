import express from 'express';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import viewsRouter from './routers/viewsRouter.js'
import productsRouter from './routers/productsRouter.js'
import cartRouter from './routers/cartRouter.js'
import sessionsRouter from './routers/sessionRouter.js'

import __dirname from './utils.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const connection = mongoose.connect("mongodb+srv://paulofr016:123@cluster01.f2wdtfx.mongodb.net/?retryWrites=true&w=majority");

app.use(session({
    store: new MongoStore({
        mongoUrl:"mongodb+srv://paulofr016:123@cluster01.f2wdtfx.mongodb.net/?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret:"CoderS3cretFelis",
    resave:false,
    saveUninitialized:false
}))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.use('/',viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions',sessionsRouter);

