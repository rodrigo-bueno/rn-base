const express = require('express');
const mongoose = require('mongoose');
const  cors = require('cors');

const app = express();

const server = require('http').Server(app);

//Habilitar o server a escutar a requisições em tempo real
const io = require('socket.io')(server);

mongoose.connect('mongodb://goweek:goweak123@ds121415.mlab.com:21415/goweek-backend-2',
    {       //Define a url em novo formato de conexão
        useNewUrlParser: true
    }
);


//Middleware
app.use((req,res, next) =>{
    req.io = io;
    return next();
});
// O cors é necessario para a atualização em tempo real da aplicação
app.use(cors());
app.use(express.json());
app.use(require('./routes'));


server.listen(3000, () => {
    console.log('Servers started on port 3000');
});