const express =  require("express");
const app = express();
const port = 3000;

app.get("/",(req,res)=>{
    res.write("<h1>Welcome to Home page</h1>");
    res.write("<h1>ABC</h1>");
    res.send();
})

app.get("/about", (req,res)=>{
    res.send("Welcome to About Page");
})

app.get("/contact", (req,res)=>{
    res.status(200).send("Welcome to contact page");
})

// app.get("/temp", (req,res)=>{
//     res.send([
//         {
//         id:1,
//         name:"taruna",
//     },
//     {
//         id:1,
//         name:"taruna",
//     },
// ]);
// })

app.get("/temp", (req,res)=>{
    res.json([
        {
        id:1,
        name:"taruna",
    },
    {
        id:1,
        name:"taruna",
    },
]);
})

app.listen(port, ()=>{
    console.log(`Listening to port number ${port}`)
})