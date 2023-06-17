
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://unstop:unstop@unstop.pur9dft.mongodb.net/unstop?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then((res) => {
        console.log("mongo connected ", `mongodb+srv://unstop:unstop@unstop.pur9dft.mongodb.net/unstop?retryWrites=true&w=majority`);
    })
    .catch(error => {
        console.log("error-", error);
    });

// mongoose.Table = mongoose.createConnection(process.env.MONGO_URI_CUSTOMER, { useNewUrlParser: true })

module.exports = mongoose;