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

const PORT = process.env.PORT;

const verify_token = (token, email, callback) => {
    if(token === undefined){
        callback(false);
        return;
    }
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
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(result);
    });
})

app.post('/login', (req,res)=>{
    const {email, password } = req.body;
    // const sql = "SELECT * FROM ci_users WHERE email = ? AND password = ?";
    const sql = "SELECT * FROM ci_users WHERE email = ?";
    const values = [email, password];

    db.query(sql, values, async(err, result) => {
        if (err){
            return res.status(500).json("Error");
        }
        if (result.length > 0) {
            result = result[0];
            user_pass = result.password;
        
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user_pass
            );
        
            if (!isPasswordCorrect) {
              return res.status(401).json("Unauthorized");
            }
        
            const token = jwt.sign(
                {email: email},
                process.env.JWT
            );
            
            return res.status(200).json({token, "balance": result.balance, "name": result.Name})
          } 
          else {  
            return res.status(401).json("Unauthorized");
          }
    });
})

app.post('/balance', (req, res) => {
    const {email} = req.body; 
    const token = req.query.access_token

    verify_token(token, email, (call_result)=>{
        if(call_result){
            const sql = "SELECT balance, Name FROM ci_users WHERE email = ?";
            db.query(sql, [email], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                if (result.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                const balance = result[0].balance;
                return res.status(200).json({ balance, name: result[0].Name });
            });
        }
        else{
            return res.status(401).json("Unauthorized");
        }
    })
});


app.post("/change-pass", (req, res)=> {
    const token = req.query.access_token
    const {email, password} = req.body;

    verify_token(token, email, (call_result) => {
        if(call_result){
            const salt = bcrypt.genSaltSync(10)
            const new_password = bcrypt.hashSync(password, salt)

            const sql = "UPDATE ci_users SET password = ? WHERE email = ?";
            db.query(sql, [new_password, email], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                if (result.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(200).json("Success");
            });
        }
        else{
            return res.status(401).json("Unauthorized");
        }
    })

})

app.post("/add-history", (req, res) => {
    const {email, service, price, number, status, code_sms} = req.body;
    const token = req.query.access_token

    verify_token(token, email, (call_result) => {
        if(call_result){
            db.query(`UPDATE ci_users SET balance = balance - ${price} WHERE email = ?; `, [email], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                else{
                    db.query(`SELECT balance from ci_users WHERE email = ?; `, [email], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                        else{
                            const final_balace = result[0].balance;


                            const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
                            const currentDate = new Date().toLocaleString('en-IN', options).split('/').reverse().join('-');
                            
                            const sql= "INSERT INTO ci_number_history (`email`,`service`,`price`, `number`, `status`, `code`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?) ";

                            db.query(sql, [email, service, price, number, status, code_sms, currentDate], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ error: 'Internal Server Error' });
                                }
                                else{
                                    return res.status(200).json({balance: final_balace});
                                }
                            });
                        }
                    })
                }
            });

            
        }
        else{
            return res.status(401).json("Unauthorized");
        }
    })
})

app.post('/feedback', (req, res) => {
    const {email, feedback} = req.body;
    const token = req.query.access_token

    verify_token(token, email, (call_result) => {
        if(call_result){
            const sql= "UPDATE ci_users SET feedback = ? WHERE email = ?;";
            db.query(sql, [feedback, email], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                else{
                    return res.status(200).json("Success");
                }
            });
        }
        else{
            return res.status(401).json("Unauthorized");
   }
})
})

app.get("/get-history", (req, res) => {
    const {email} = req.body;
    const token = req.query.access_token

    verify_token(token, email, (call_result) => {
        if(call_result){
            const sql= "SELECT * FROM ci_number_history WHERE email = ?";
            db.query(sql, [email], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                else{
                    return res.status(200).json(result);
                }
            });
        }
        else{
            return res.status(401).json("Unauthorized");
        }
    })
})

app.get('/services1', (req, res) => {
    // Fetch services from the database
    const query = 'SELECT * FROM ci_services1';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
  app.get('/services2', (req, res) => {
      // Fetch services from the database
      const query = 'SELECT * FROM ci_services2';
    
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching services:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    });
  
    app.get('/services3', (req, res) => {
      // Fetch services from the database
      const query = 'SELECT * FROM ci_services3';
    
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching services:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    });


app.get('/', (req, res) => {
    return res.json("Connected to server")
})


// For testing purposes of verify_token function
// app.get("/test", async(req, res) => {
//     const token = req.query.access_token
//     const {email} = req.body;

//     verify_token(token, email, (result) => {
//         if(result){
//             return res.status(200).json("Success")
//         }
//         else{
//             return res.status(401).json("Unauthorized");
//         }
//     })
// })

app.get('/get_user', (req, res) => {
    const {email} = req.body;
    const sql = "SELECT * from ci_users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(result);
    });
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})

// db.query("SELECT * from ci_number_history ;", (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// })
