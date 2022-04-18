const trendRoute = require('./trendRoute') ;
const express = require('express') ;
const cors = require('cors') ;
require('dotenv').config() ;

const app = express() ;
app.use(cors()) ;

app.use('/api/trend', trendRoute) ;

app.listen(process.env.PORT || 5000, () => {
    console.log("server is up and running") ;
})
