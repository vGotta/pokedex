import { Router } from 'express'
import UserModel from "../models/user.js"
import UserController from '../controllers/userController.js';
import authguard from '../customDependencies/authguard.js';

const userRouter = Router()


/*********** ROUTE POUR AFFICHER LE FORMULAIRE D'INSCRIPTION **********/

userRouter.get('/subscribe', async (req, res) => {
    try {
        res.render('subscribe.twig', {  /************* "Render" affiche la page *****************/
        });
    } catch (error) {
        res.send(error);
    }
});


/************** ROUTE POUR INSCRIRE ET RE-DIRIGER VERS LA PAGE D'ACCUEIL APRER INSCRIPTION  *************/


userRouter.post('/subscribe', async (req, res) => {
    try {
        await UserController.subscribe(req)
        res.redirect('/home');/********* REDIRECT = REDIRIGE vers la route "page utilisateur" ***********/  /******** ON PEUT REDIRIGER QUE VERS DES ROUTE ********/
    } catch (error) {
        res.send(error);
    }
});

/**Afficher la page de connexion**/

userRouter.get('/login', async (req, res) => {
    try {
      let error = ""
      if (req.session.error) {            /**si la connection echoue**/
        error = req.session.error       /**la variable error = req.session.error = "vous n'etes pas connecté"**/
        req.session.error = ""
      }
      res.render('login.twig', {
        error: error
      })
    } catch (error) {
      console.log(error);
    }
  })

/**Se connecter**/

userRouter.post('/login', async (req, res) => {
    let user = await UserController.login(req)
    if (user) {
      req.session.user = user._id
      res.redirect('/home')
    } else {
      req.session.error = "vous n'etes pas connecté"
      res.redirect("/login")
    }
  })

/********* PERMET DE SE DECONECTER ET D'ARRIVER SUR LA PAGE "LOGIN" ***********/

userRouter.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/login');
});



/*********** ROUTE POUR AFFICHER LA PAGE HOME **********/

/*

userRouter.get('/pageUtilisateur', async (req, res) => {
    try {
        let users = await UserModel.find()
        res.render('home.twig', {
            users : users
        });
    } catch (error) {
        res.send(error);
    }
});

*/




export default userRouter