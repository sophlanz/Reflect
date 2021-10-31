const express = require ('express');
const router = express.Router();
const app = require ('../app')
const Reflection = require ('../models/reflection')
require ('../config/passport');




router.post ('/new-reflection', async (req,res)=> {
    
    const user = req.user;
    const userId = req.user.id
    const username = user.username
    console.log(user);
    const title = req.body.title
    const reflection = req.body.reflection
    const category = req.body.category
    const topic = req.body.topic
    
    console.log({title, reflection, category, topic, username,user});


    if (!(title && reflection && category && topic)) {
        res.status(400).send({message : "All fields required"})
     } else {
        const newReflection = await Reflection.create ({
            title : title,
            reflection : reflection,
            category : category,
            topic : topic,
            username : username,
            user : userId
    
        });
        console.log(newReflection);
        newReflection.save() 
                .then ( result => {
                        res.status(200).send({message : "reflection saved", result})
                    })
                }
        
                
                   
                res.redirect('/reflection-saved')
       
    }

);

router.get('/new-reflection',  (req,res,next)=> {
    const form = '<h1>Create a Reflection</h1><form method="POST" action="/new-reflection">\
    Title: <br><input type="text" name="title">\
    <br>Reflection: <br><input type="text" name="reflection">\
    <br>Category: <br> <select id="catogry" name="category">  <option value="yearly">yearly</option> <option value="monthly">monthly</option> <option value="weekly">weekly</option><option value="daily">daily</option></select>\
    <br>Topic: <br> <select id="topic" name="topic">  <option value="religion and spirituality">religion and spirituality</option> <option value="career">career</option> <option value="health">health</option><option value="romantic relationships">romantiy relationships</option></select>\
    <br><br><input type="submit" value="Submit"></form>';
  
    res.send(form);
 })
 
 router.get('/reflection-saved', (req,res)=> {
     res.send('<p>Reflection saved successfully <a href= "/my-reflections">Go to my reflections</a><p>')
 })

 router.get('/my-reflections', (req,res,next)=> {
   const userId = req.user.id
    Reflection.find({user : userId} , (err, reflections)=> {
        if (err) {
            res.status(404).json({message : err})
        } else if (! reflections) {
            res.status(404).json({message : "You don't have any reflections"})
        }
        else {
            res.status(200).send({reflections})
        }
    })

 });
module.exports = router;
