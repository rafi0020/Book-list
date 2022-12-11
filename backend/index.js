import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection ( {
    host:"Loca lhost'",
    user:"root",
    password: "123456",
    database: "book-list",
})

//if  there is a authentication error
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'


app.get('/', (req, res) => {
    res.json("Hello this is the backend");
})

app.get('/books', (req, res) => {
    db.query("SELECT * FROM books", (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books ('title','desc','cover') VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.cover];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book added successfully");
    })
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book deleted successfully");
    })
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET 'title' = ?, 'desc' = ?, 'price' = ?, 'cover' = ? WHERE id = ?";
    const values = [req.body.title, req.body.desc, req.body.cover];

    db.query(q, [...values,bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book updated successfully");
    })
})

app.listen(8000, () => {
    console.log('Connected to backend!')
    })