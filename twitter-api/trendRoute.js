const router = require('express').Router() ;
var Twit = require('twit') ;
require('dotenv').config() ;

var T = new Twit({
    consumer_key:         process.env.API_KEY,
    consumer_secret:      process.env.API_SECRET,
    access_token:         process.env.Access_Token,
    access_token_secret:  process.env.Access_Secret  
});

// id value represents the location of trend. by default 1 is worldwide
var params= { 
    id: 1,
}

// returns top 50 TT
T.get('trends/place',params, function(err, data, response) {
    const keys = Object.keys(data) ;
    keys.forEach(element => {
        console.log(data[element].trends)
        console.log(typeof data[element].trends) ;
    });
});

router.get('/',async(req,res) => {
    try{
        res.status(200).json("Test") ;
    }
    catch(err){
        console.log(err) ;
    }

}) ;

module.exports = router ;