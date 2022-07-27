/**********  IMPORTER TOUT LES MODULE POUR LE FONCTIONEMENT ************/

import express from 'express';
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import cors from 'cors';
import session from "express-session";
import pokeRouter from "./routes/pokeRoute.js";
import 'dotenv/config';

const db = process.env.BOD_URL
const app = express()
const router = express.Router()

app.use(session({secret: process.env.SECRET, saveUninitialized: true,resave: true}));
app.use(cors())
app.use(express.static('./assets'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
router.use(userRouter)
router.use(pokeRouter)


app.listen(process.env.PORT, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log(`connected to ${process.env.APP_URL}`);
    }
})

mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connected to database mongodb (c'est dur....)");
    }
})

/****** Permet de rediriger vers login si aucune route ne corespond dans l'url *******/

router.get("*", (req, res) => {
    res.redirect('/login')
})

export default router


