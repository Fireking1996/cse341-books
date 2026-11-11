import { getDb } from '../db/connect.js';
import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorInDb,
  updateAuthor as updateAuthorInDb,
  deleteAuthor as deleteAuthorFromDb
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Failed to retrieve authors:', error.message);

    return res.status(500).json({
      message: 'Unable to retrieve authors.'
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Failed to retrieve author:', error.message);

    return res.status(500).json({
      message: 'Unable to retrieve author.'
    });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (
      typeof id !== 'string' ||
      !id.trim() ||
      typeof name !== 'string' ||
      !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear <= 0
    ) {
      return res.status(400).json({
        message: 'Valid id, name, and birthYear are required.'
      });
    }

    const authorId = id.trim();
const existingAuthor = await getAuthorByIdFromDb(authorId);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'An author with this ID already exists.'
      });
    }

    const newAuthor = {
  id: authorId,
  name: name.trim(),
  birthYear
};

    const createdAuthor = await createAuthorInDb(newAuthor);

    return res.status(201).json(createdAuthor);
  } catch (error) {
    console.error('Failed to create author:', error.message);

    return res.status(500).json({
      message: 'Unable to create author.'
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear <= 0
    ) {
      return res.status(400).json({
        message: 'Valid name and birthYear are required.'
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(req.params.id);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    const updatedAuthor = {
      name: name.trim(),
      birthYear
    };

    await updateAuthorInDb(req.params.id, updatedAuthor);

    return res.status(200).json({
      id: req.params.id,
      ...updatedAuthor
    });
  } catch (error) {
    console.error('Failed to update author:', error.message);

    return res.status(500).json({
      message: 'Unable to update author.'
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    const existingAuthor = await getAuthorByIdFromDb(authorId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found'
      });
    }

    const db = getDb();
    const booksByAuthor = await db
      .collection('books')
      .findOne({ authorId });

    if (booksByAuthor) {
      return res.status(409).json({
        message: 'Cannot delete an author who has associated books.'
      });
    }

    await deleteAuthorFromDb(authorId);

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete author:', error.message);

    return res.status(500).json({
      message: 'Unable to delete author.'
    });
  }
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
