const Result = (status,error,message,data,res) =>{
    res.code(status).send({
        error,
        message,
        data
    })
}





module.exports = Result;