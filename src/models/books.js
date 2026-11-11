import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');

  const books = await collection.find({}).toArray();

  return books;
};

const getBookById = async (id) => {
  const db = getDb();
  const collection = db.collection('books');

  const book = await collection.findOne({ id });

  return book;
};

const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');

  await collection.insertOne(book);

  return book;
};

const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.updateOne(
    { id },
    { $set: book }
  );

  return result;
};

const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.deleteOne({ id });

  return result;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
