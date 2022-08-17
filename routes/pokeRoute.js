/******** NOUVELLE FICHIER POUR POUVOIR AJOUTER DES ROUTES POUR LES DES POKEMON ********/

import { Router } from 'express'
import pokeModel from "../models/pokeModel.js"
import UserModel from "../models/user.js"
import authguard from '../customDependencies/authguard.js';

const pokeRouter = Router()


/********* PERMET D'AFFICHER LA PAGE POUR AJOUTER UN POKEMON *********/

pokeRouter.get('/pokemon', async (req, res) => {
    let pokemons = await pokeModel.find()
    res.render('createPoke.twig');
  
  })


/******** PERMET DE LIER UN UTILISATEUR A UN POKEMON ********/


pokeRouter.get('/pokemon/:id', async (req, res) => {
    try {
      let pokemon = await pokeModel.findOne({ _id: req.params.id })
      res.json(pokemon)
    } catch (error) {
      console.log(error);
    }
  })




  /********* PERMET D'AJOUTER UN NOUVEAU POKEMON **********/


   pokeRouter.post('/pokemon', async (req, res) => {
    try {
      req.body.trainer = req.session.user
      const newUser = new pokeModel(req.body)
      await newUser.save()
      res.redirect('/home')
    } catch (error) {
      console.log(error);
    }
  });


/********** PERMET DE SUPRIMER UN POKEMON  **********/

pokeRouter.get('/delete/:id', async (req, res) => {
    try {
      await pokeModel.deleteOne({ _id: req.params.id })
      // await user.deleteOne({ _id: entry._id });
      //pkmnModel.splice(pkmnModel.indexOf(user),1)
      res.redirect('/home')
    } catch (error) {
      // console.log(error);
      res.send(error)
    }
  })


/************** PERMET D'AFFICHER LA PAGE POUR MODDIFIER LES POKEMON ************/

  pokeRouter.get('/updatePokemon/:id', async (req, res) => {
    try {
      let pokemon = await pokeModel.findOne({ _id: req.params.id })
      res.render('UpdatePokemon.twig', {
        pokemon: pokemon
      })
  
    } catch (error) {
      res.send(error)
    }
  })
  


/************  PERMET DE MODIFIER LES POKEMON ***************/

  pokeRouter.post('/updatePokemon/:id', async (req, res) => {
    try {
      await pokeModel.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/home")
    } catch (error) {
      res.send(error)
    }
  })
  

  
/************ PERMET D'ARRIVER SUR LA PAGE HOME **************/

pokeRouter.get('/home', authguard, async (req, res) => {
    let userConnected = await UserModel.findOne({_id: req.session.user})
  if (userConnected) {
    userConnected = userConnected.name
  }
  let pokemons = await pokeModel.find()
  res.render('home.twig', {
    pokemons: pokemons,
    userConnected: userConnected

  });
});





export default pokeRouter
