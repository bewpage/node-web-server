const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const cool = require('cool-ascii-faces');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   //'\n' this is character to make new line in log file
   fs.appendFile('server.log', log + '\n', (err) => {
       if(err){
           console.log('Unable to append to server.log')
       }
   });
   next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// //we not call next and we stop here
// });
//to not show other subpages we have to move it here
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'welcome message'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        message: 'About message'
    });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'sorry, somthing went wrong'
   })
});

app.get('/cool', (req, res) => {
    res.send(cool());
});

app.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});