const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/hyperting';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

module.exports = mongoose;