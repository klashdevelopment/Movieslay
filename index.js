var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT||8080;

app.use(express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/public'));

app.get('/movies', (req, res) => {
    var movies = [];
    fs.readdirSync(__dirname + '/public/movies').forEach(file => {
        movies.push(fs.readFileSync(__dirname + '/public/movies/' + file, 'utf8'));
    });
    res.end(JSON.stringify(movies));
});
app.get('/watch/:name', (req, res) => {
    try{
    var name = req.params.name;
    var movie = JSON.parse(fs.readFileSync(__dirname + '/public/movies/' + name + '.json', 'utf8'));
    res.render('watch.ejs', {movie: movie});
    }catch(e){
    }
});
app.listen(port, ()=>{
    console.log("App listening on port " + port);
});