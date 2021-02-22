const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const app = express();
const PORT = 9000;
var dictionaryController = require('./controller/word_search.js');

app.use(bodyParser.urlencoded({
	extended: true
	
}));
app.use(bodyParser.json());

//adding display page using hbs
app.set('views', path.join(__dirname,'/view/' ));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/view/', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');

app.listen(PORT, ()=>{
    console.log(`Server Running on port: http://localhost:${PORT}`);
});

app.use('/search',dictionaryController);

