// first import install libery 

var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const path = require("path");


const app = express()


const static_path = path.join(__dirname,"/public");


app.use(bodyParse.json())
app.use(express.static(static_path))
app.use(bodyParse.urlencoded({
    extended: true
}))

app.set("view engine", "hbs");

// conect database


mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;

// check connect

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));


app.get("/", (req, res) => {

    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('index.html');

})


app.get("/Register", (req, res) => {


    return res.redirect('Register.html');

})



app.post("/login", async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;

        const user = await db.collection('users').findOne({ email: username });

        if (user === null) {
            response.send("Invalid information!❌❌❌! Please create an account first");
        } else {
            if (user.password === password) {
                    const users = await db.collection('users').find().toArray();

                    return response.redirect('/login.html?users=' + JSON.stringify(users));
                    


            } else {
                response.send("Invalid Password!❌❌❌");
            }
        }
    } catch (error) {
        response.send("Invalid information❌");
    }
})

app.get('/register', (request, response) => {
    response.sendFile(__dirname + '/register.html');
});

app.post('/add', async (request, response) => {
    try {
        const username = request.body.username;
        const email = request.body.email;
        const phone = request.body.phone;
        const password = request.body.password;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await db.collection('users').findOne({ email: email });
        if (existingUser) {
            response.send("L'utilisateur existe déjà. Veuillez vous connecter.");
        } else {
            // Créez un nouvel utilisateur et enregistrez-le dans la base de données
            const newUser = {
                name: username,
                email: email,
                phone: phone,
                password: password
            };
            await db.collection('users').insertOne(newUser);
            response.send("Inscription réussie! Vous pouvez maintenant vous connecter.");
        }
    } catch (error) {
        response.send("Une erreur s'est produite lors de l'inscription.");
    }
});


app.listen(3000, () => {

    console.log('server is running 3000')

})