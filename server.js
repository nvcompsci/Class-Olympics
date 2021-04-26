const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/classolympics.db')


//serve client side files
app.use(express.static('public'))
app.use(express.json())

app.get("/events", (req,res) => {
    console.log("GET on /events",req.ip)
    const sql = `SELECT id,
    title,
    location,
    capacity,
    teachers.first_name,
    teachers.last_name
FROM events
LEFT JOIN teachers
ON events.id = teachers.event_id;`
    
    db.all(sql,[],(err, rows) => {
        console.log(rows)
        res.send(rows)
    })
})

app.post("/register", (req,res)=> {
    const reg = req.body;


        const sql = "INSERT INTO registrations (event_id, student_id) VALUES (?,?);"
        db.run(sql,[reg.event_id,reg.user_id])

        res.send({
            message: "Post successfully saved"
        })
   
})

app.post("/login", (req, res) => {
    const user = req.body
    //5. retrieve all users from database
    //6. only retrieve users with matching username and password
    const sql2 = "SELECT id, first_name, last_name FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        if (rows && rows.length > 0) {
            res.send({
                message: "Successful login!",
                user: rows[0]
            })
        }
    

    //let userMatch = users.find( (u) => u.username == user.username && u.password == user.password )
    //Does userMatch exist?
    
    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            //save new account on server
            //4. New user is stored in database
            const sql = "INSERT INTO users (username, password, first_name, last_name) VALUES (?,?,?,?)"
            db.run(sql,[user.username, user.password, user.firstName, user.lastName],(err) => {
                if (err) console.error(err)
                res.send({
                    message: "Your account was successfully created.",
                    userId: this.lastID
                })
            })
        }
        else {
            res.status(401)
            res.send({
                message: "Username or password is invalid."
            })
        }
    }
    })
})

app.listen(3000, () => console.log("Server started"))