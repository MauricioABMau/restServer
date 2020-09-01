//=================
// Puerto
//=================
process.env.PORT = process.env.PORT || 3000;
//=================
// Entorno
//=================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//=================
// Entorno
//=================
const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        console.log(process.env.DB_CNN);
        await mongoose.connect('mongodb+srv://user:wubXQHDFVXakHaos@cluster0.l3xjm.mongodb.net/hospital', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,

            useFindAndModify: false,

        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la  BD ver logs')
    }
}

module.exports = {
    dbConnection
}