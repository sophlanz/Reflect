//mongoose setup
const mongoose = require ('mongoose');
const uri = process.env.ATLAS_URI;
const connectionParams = {
    useNewUrlParser : true ,
    useUnifiedTopology : true
}
exports.connect = () => {
mongoose.connect(uri,connectionParams)
    .then (() => {
        console.log('Connected to the Database!')
    }) .catch((err)=> {
        console.log(`Error connecting to the Database. \n${err}`)
        process.exit(1);
    })
};
