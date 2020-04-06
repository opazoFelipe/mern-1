const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

const mongooseConf = {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false
};

mongoose.connect(URI, mongooseConf)
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;