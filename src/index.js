const express = require ("express");
const app = express();
const hbs = require("hbs");
const port = 8000;
const path = require("path");
const requests = require("requests");

//built in middleware



// console.log(path.join(__dirname, '../public'));

const staticPath = path.join(__dirname, '../public');
const templatepath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// //to set the view engine
app.set('view engine', 'hbs');
app.set('views', templatepath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

// app.use(express.static(staticPath));

//template engine route

app.get("", (req,res)=>{
    res.render('index', {
        name: "Taruna Saini",
    });
})

app.get("/about",(req,res)=>{
        // name : req.query.name,
        // age:req.query.age,
        requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=fb9c7f37e0b921beeda75d1bbc880ebf`)
.on("data",  (chunk) => {
    const objdata = JSON.parse(chunk);
    const arrayData = [objdata];
    console.log(`city name is ${arrayData[0].name} and temp is ${arrayData[0].main.temp}`);
    res.write(arrayData[0].name);
 })
.on('end',  (err) => {
  if (err) return console.log('connection closed due to errors', err);
 res.end();
});
});
    // console.log(req.query);

// app.get("/",(req,res)=>{
//     res.send("Hello from the express server");
// })

app.get('/about/*',(req,res)=>{
    res.render('404', {
        errorcomment: "This about us page cannot be found",
    });
})

app.get('*',(req,res)=>{
    res.render('404', {
        errorcomment: "Page Not Found",
    });
})

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
})