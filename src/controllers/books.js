import { getDb } from '../db/connect.js';

import {
  getAllBooks as getAllBooksModel,
  getBookById as getBookByIdModel,
  createBook as createBookModel,
  updateBook as updateBookModel,
  deleteBook as deleteBookModel
} from '../models/books.js';

const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksModel();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Failed to retrieve books:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await getBookByIdModel(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to retrieve book:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    if (
      typeof id !== 'string' ||
      !id.trim() ||
      typeof authorId !== 'string' ||
      !authorId.trim() ||
      typeof title !== 'string' ||
      !title.trim() ||
      typeof publicationDate !== 'string' ||
      !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: 'All book fields are required.'
      });
    }

    const db = getDb();

    const existingBook = await db.collection('books').findOne({
      id: id.trim()
    });

    if (existingBook) {
      return res.status(409).json({
        message: 'A book with this ID already exists.'
      });
    }

    const author = await db.collection('authors').findOne({
      id: authorId.trim()
    });

    if (!author) {
      return res.status(400).json({
        message: 'Referenced author does not exist.'
      });
    }

    const newBook = {
      id: id.trim(),
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate: publicationDate.trim()
    };

    const book = await createBookModel(newBook);

    return res.status(201).json(book);
  } catch (error) {
    console.error('Failed to create book:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { authorId, title, publicationDate } = req.body;

    if (
      typeof authorId !== 'string' ||
      !authorId.trim() ||
      typeof title !== 'string' ||
      !title.trim() ||
      typeof publicationDate !== 'string' ||
      !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: 'All book fields are required.'
      });
    }

    const existingBook = await getBookByIdModel(req.params.id);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    const author = await getDb().collection('authors').findOne({
      id: authorId.trim()
    });

    if (!author) {
      return res.status(400).json({
        message: 'Referenced author does not exist.'
      });
    }

    const updatedBook = {
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate: publicationDate.trim()
    };

    await updateBookModel(req.params.id, updatedBook);

    const book = await getBookByIdModel(req.params.id);

    return res.status(200).json(book);
  } catch (error) {
    console.error('Failed to update book:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const result = await deleteBookModel(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete book:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};