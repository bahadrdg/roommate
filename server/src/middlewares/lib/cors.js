const corsWhiteList = ["http://localhost:3000", "http://localhost:3001"] 

const cors = (req,callback) => {
    let corsOptions 
    if(corsWhiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin : true}
    }
    else {
        corsOptions = {origin : false}
    }
    callback(null, corsOptions)
}

module.exports = cors