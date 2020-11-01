const responder = (result, res) => {
    try{
        res.send(result);
    }
    catch(e){
        return result;
    }
}

module.exports = responder;