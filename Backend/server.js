const express= require("express");
const session = require("express-session");
const mysql = require('mysql');
const cors= require('cors');
const dotenv= require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


dotenv.config({path: './.env'});

const app=express();
app.use(cors());
app.use(express.json());
// app.use(
//     session({
//       secret: "myRandomSecretKey123", // Add a secret key for session data
//       resave: false,
//       saveUninitialized: true,
//     })
//   );

  const db = mysql.createPool({
    connectionLimit: 500, // Adjust as needed
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });

// db.connect((error) => {
//     if (error) {
//         console.log(error)
//     } else{
//         console.log("MYSQL connected")
//     }
// })

const PORT = 8081;

const verify_token = (token, email, callback) => {
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err){
            callback(false);
        }        
        if (user.email == email){
            callback(true);
        }   
        else{
            callback(false);
        }    
    });
}

app.post('/signup', (req,res)=>{
    let { name, email, password } = req.body;
    const sql= "INSERT INTO ci_users (`name`,`email`,`password`) VALUES (?, ?, ?) ";
    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hashSync(password, salt)

    const values = [name, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(result);
    });
})

app.post('/login', (req,res)=>{
    const {email, password } = req.body;
    console.log(email, password);
    // const sql = "SELECT * FROM ci_users WHERE `email` = ? AND `password` = ?";
    const sql = "SELECT * FROM ci_users WHERE `email` = ?";
    const values = [email, password];

    db.query(sql, values, async(err, result) => {
        if (err){
            return res.status(500).json("Error");
        }
        if (result.length > 0) {
            result = result["email"];
            user_pass = result["password"];
        
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user_pass
            );
        
            if (!isPasswordCorrect) {
              return res.status(401).json("Unauthorized");
            }
        
            // Store user ID in the session
            
            req.session.userId = result.id;
            
        
            // ... (the rest of your code)
          } else {  
            return res.status(401).json("Unauthorized");
          }
    });
})

app.get('/balance', (req, res) => {
    const userId = req.session.userId; // Assuming user ID is stored in the session
    const sql = "SELECT balance FROM ci_users WHERE id = ?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const balance = result[0].balance;
        return res.json({ balance });
    });
});


app.get('/', (req, res) => {
    return res.json("Connected to server")
})


// For testing purposes of verify_token function
app.get("/test", async(req, res) => {
    const token = req.query.access_token
    console.log(token);
    console.log(req.body);
    const {email} = req.body;
    verify_token(token, email, (result) => {
        if(result){
            return res.status(200).json("Success")
        }
        else{
            return res.status(401).json("Unauthorized");
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})