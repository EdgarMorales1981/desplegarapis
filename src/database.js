const mongoose = require('mongoose');

//conecto la base de datos con mongo. es importante tener en cuensta estas cadenas de conexion
mongoose.connect('mongodb+srv://edgar:edgar123@cluster0-zeaxr.mongodb.net/apiservices?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }).then(() => console.log('database is connected'))
    .catch(err => console.log(err))