CREATE DATABASE library;
USE library;

-- Members (Students/Faculty)
CREATE TABLE Members (
    MemberID INT PRIMARY KEY AUTO_INCREMENT,
    MemberName VARCHAR(100),
    MemberType VARCHAR(50),
    MemberContact VARCHAR(20),
    MemberAddress VARCHAR(255)
);

-- Authors
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorName VARCHAR(100),
    AuthorContact VARCHAR(20),
    AuthorBio TEXT
);

-- Books
CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    BookTitle VARCHAR(200),
    AuthorID INT,
    ISBN VARCHAR(20),
    PublishedYear YEAR,
    Genre VARCHAR(50),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

-- Transactions (Issuing/Returning Books)
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    MemberID INT,
    BookID INT,
    TransactionType VARCHAR(20),
    TransactionDate DATE,
    DueDate DATE,
    FOREIGN KEY (MemberID) REFERENCES Members(MemberID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Fine Records
CREATE TABLE FineRecords (
    FineID INT PRIMARY KEY AUTO_INCREMENT,
    MemberID INT,
    BookID INT,
    FineAmount DECIMAL(10, 2),
    FineReason VARCHAR(255),
    FineDate DATE,
    FOREIGN KEY (MemberID) REFERENCES Members(MemberID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Inserting Data

-- Inserting Members (Students/Faculty)
INSERT INTO Members (MemberName, MemberType, MemberContact, MemberAddress) 
VALUES ('John Doe', 'Student', '123-456-7890', '123 Main St');
INSERT INTO Members (MemberName, MemberType, MemberContact, MemberAddress) 
VALUES ('Jane Smith', 'Faculty', '987-654-3210', '456 Elm St');

-- Inserting Authors
INSERT INTO Authors (AuthorName, AuthorContact, AuthorBio) 
VALUES ('Stephen King', 'author@email.com', 'Bestselling author known for horror novels.');
INSERT INTO Authors (AuthorName, AuthorContact, AuthorBio) 
VALUES ('J.K. Rowling', 'jkrowling@gmail.com', 'Famous for the Harry Potter series.');

-- Inserting Books
INSERT INTO Books (BookTitle, AuthorID, ISBN, PublishedYear, Genre) 
VALUES ('The Shining', 1, '9780307743657', 1977, 'Horror');
INSERT INTO Books (BookTitle, AuthorID, ISBN, PublishedYear, Genre) 
VALUES ('Harry Potter and the Philosopher''s Stone', 2, '9780747532743', 1997, 'Fantasy');

-- Inserting Transactions (Issuing/Returning Books)
INSERT INTO Transactions (MemberID, BookID, TransactionType, TransactionDate, DueDate) 
VALUES (1, 1, 'Issued', '2023-10-25', '2023-11-25');
INSERT INTO Transactions (MemberID, BookID, TransactionType, TransactionDate, DueDate) 
VALUES (2, 2, 'Issued', '2023-10-28', '2023-11-28');

-- Inserting Fine Records
INSERT INTO FineRecords (MemberID, BookID, FineAmount, FineReason, FineDate) 
VALUES (1, 1, 5.00, 'Late return', '2023-11-26');
INSERT INTO FineRecords (MemberID, BookID, FineAmount, FineReason, FineDate) 
VALUES (2, 2, 2.50, 'Damage', '2023-11-29');