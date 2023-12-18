import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors())
app.use(express.static('./public'));

// data parse middleware
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

app.get('/allMembers', async (req,res) => {
    const [allMembers] = await pool.query("SELECT * FROM Members");
    res.json(allMembers);
})

app.get('/allBooks', async(req,res) => {
    const [allBooks] = await pool.query(`SELECT b.BookTitle, a.AuthorName, b.ISBN, b.PublishedYear, b.Genre 
    FROM Books b 
    JOIN Authors a ON b.AuthorID = a.AuthorID`);
    res.json(allBooks);
})

app.get('/allTransaction', async (req,res) => {
    const [allTransaction] = await pool.query(`SELECT m.MemberName, b.BookTitle, t.TransactionType, t.TransactionDate, t.DueDate 
    FROM Transactions t 
    JOIN Members m ON t.MemberID = m.MemberID 
    JOIN Books b ON t.BookID = b.BookID`);
    res.json(allTransaction);
})

app.get('/fineRecord', async (req,res) => {
    const [fineRecord] = await pool.query(`SELECT m.MemberName, b.BookTitle, fr.FineAmount, fr.FineReason, fr.FineDate 
    FROM FineRecords fr 
    JOIN Members m ON fr.MemberID = m.MemberID 
    JOIN Books b ON fr.BookID = b.BookID`);
    res.json(fineRecord);
})

app.get('/allAuthor', async (req,res) => {
    const [allAuthor] = await pool.query("SELECT * FROM Authors");
    res.json(allAuthor);
})

app.post('/addMember', async (req,res) => {
    const {MemberName, MemberType, MemberContact, MemberAddress} = req.body;
    await pool.query(`INSERT INTO Members (MemberName, MemberType, MemberContact, MemberAddress) 
    VALUES (?,?,?,?)`,[MemberName, MemberType, MemberContact, MemberAddress]);
    res.json({success:true, msg: `Successfully added the new member ${MemberName}`});
})

app.post('/addAuthor', async (req,res) => {
    const {AuthorName, AuthorContact, AuthorBio} = req.body;
    await pool.query(`INSERT INTO Authors (AuthorName, AuthorContact, AuthorBio) 
    VALUES (?,?,?)`,[AuthorName, AuthorContact, AuthorBio]);
    res.json({success:true, msg: `Successfully added the new member ${AuthorName}`});
})

app.post('/addBook', async (req,res) => {
    const {BookTitle, AuthorID, ISBN, PublishedYear, Genre} = req.body;
    await pool.query(`INSERT INTO Books (BookTitle, AuthorID, ISBN, PublishedYear, Genre) 
    VALUES (?,?,?,?,?)`, [BookTitle, AuthorID, ISBN, PublishedYear, Genre]);
    res.json({success:true, msg: `Successfully added the new member ${BookTitle}`});
})

app.post('/addTrasactions', async(req,res) => {
    const {MemberID, BookID, TransactionType, TransactionDate, DueDate} = req.body;
    await pool.query(`INSERT INTO Transactions (MemberID, BookID, TransactionType, TransactionDate, DueDate) 
    VALUES (?,?,?,?,?)`);
    res.json({success:true});
})

app.post('/addFine', async (req,res) => {
    const {MemberID, BookID, FineAmount, FineReason, FineDate} = req.body;
    await pool.query(`INSERT INTO FineRecords (MemberID, BookID, FineAmount, FineReason, FineDate) 
    VALUES (?,?,?,?,?)`,[MemberID, BookID, FineAmount, FineReason, FineDate]);
    res.json({success:true});
})

app.post('/runQuery', async(req,res) => {
    const {query} = req.body;
    const [result] = await pool.query(query);
    res.json(result);
})

app.listen(process.env.PORT, () => {
    console.log("Listening to the port 5000");
})