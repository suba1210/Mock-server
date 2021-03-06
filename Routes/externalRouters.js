const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const {checkAuth} =require('../middleware/checkAuth');

let location;


const fetch = require('node-fetch');


let url = `http://api.ipapi.com/api/check?access_key=ff1d5d234467a690947054984e3fc2f0`;

let settings = { method: "Get" };
      
fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        location = json.country_name;
        console.log(json);
});


const User = require('../Models/userModel');
const Server = require('../Models/serverModel');
const Router = require('../Models/router');
const Schema = require('../Models/schemaModel');
const Sub = require('../Models/subRout');





function makeNum(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for( var i = 0; i < length; i++ ){
        result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
   return result;
}


function makeStr(length) {
    var result           = '';
    var characters       = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    var charactersLength = characters.length;
    for( var i = 0; i < length; i++ ){
        result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
   return result;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
   return result;
}

router.get('/api/:server/:router/api/:sub',async(req,res)=>{
    const server = await Server.findOne({name:req.params.server})
    const router = await Router.findOne({name:req.params.router});
    const sub = await Sub.findOne({name:req.params.sub});
    res.send(sub.send);
})


router.get('/api/:server/:router',async(req,res)=>{

    const server = await Server.findOne({name:req.params.server})
    const router = await Router.findOne({name:req.params.router});
    if(router.type=='post'){
        res.send("This is not a post request");
    }
    else{
        router.clicks = router.clicks + 1 ;
        router.location = router.location.concat(location);
        router.save();
        const json = JSON.stringify(router.send);
        res.send(json);
    }

})



router.post('/api/:server/:router',async(req,res)=>{

    const server = await Server.findOne({name:req.params.server})
    const router = await Router.findOne({name:req.params.router});
    if(router.type=='get'){
        res.send("This is not a get request");
    }
    else{
        router.clicks = router.clicks+1;
        res.send(req.body);
    }

})



router.get('/:server/api/:model/all',async(req,res)=>{
    
    const server = await Server.findOne({name:req.params.server})
    const schema = await Schema.findOne({name:req.params.model});
    let s1,s2,s3;
    if(schema.type1==='number')
    {
        s1 = makeNum(10);
        s1 = parseFloat(s1);
    }
    if(schema.type1==='string')
    {
        s1 = makeStr(10);
    }
    if(schema.type2==='number')
    {
        s2 = makeNum(10);
        s2 = parseFloat(s2);
    }
    if(schema.type2==='string')
    {
        s2 = makeStr(10);
    }
    if(schema.type3==='number')
    {
        s3 = makeNum(10);
        s3 = parseFloat(s3);
    }
    if(schema.type3==='string')
    {
        s3 = makeStr(10);
    }

    let json = `{
        "_id" : "ObjectId(${makeid(10)})"
        "${schema.name1}" : "${s1}",
        "${schema.name2}" : "${s2}",
        "${schema.name3}" : "${s3}"
    }`;

    let json1 = `{
        "_id" : "ObjectId(${makeid(10)})"
        "${schema.name1}" : "${s1}",
        "${schema.name2}" : "${s2}",
        "${schema.name3}" : "${s3}"
    }`;

    let random = Math.floor(Math.random() * 10) + 1;


    for(let i=0;i<random;i++)
    {
        json = json+json1;
    }

    res.send(json);
    

})

router.get('/:server/apid/:model/:id',async(req,res)=>{
 
    const server = await Server.findOne({name:req.params.server})
    const schema = await Schema.findOne({name:req.params.model});
    let s1,s2,s3;
    if(schema.type1==='number')
    {
        s1 = makeNum(10);
        s1 = parseFloat(s1);
    }
    if(schema.type1==='string')
    {
        s1 = makeStr(10);
    }
    if(schema.type2==='number')
    {
        s2 = makeNum(10);
        s2 = parseFloat(s2);
    }
    if(schema.type2==='string')
    {
        s2 = makeStr(10);
    }
    if(schema.type3==='number')
    {
        s3 = makeNum(10);
        s3 = parseFloat(s3);
    }
    if(schema.type3==='string')
    {
        s3 = makeStr(10);
    }

    let json = `{
        "_id" : "ObjectId(${req.params.id})"
        "${schema.name1}" : "${s1}",
        "${schema.name2}" : "${s2}",
        "${schema.name3}" : "${s3}"
    }`;


    res.send(json);

    

})
























module.exports = router;