
import express from 'express';

import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from './controllers/authors.js';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from './controllers/books.js';

const router = express.Router();

// ========================
// AUTHOR ROUTES
// ========================

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthYear:
 *                 type: integer
 *                 example: 1980
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid author data
 *       409:
 *         description: Duplicate author ID
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Author
 *               birthYear:
 *                 type: integer
 *                 example: 1981
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author's ID
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author has associated books
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthor);

// ========================
// BOOK ROUTES
// ========================

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Unable to retrieve books
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's ID
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books/:id', getBookById);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: The Open Road
 *               publicationDate:
 *                 type: string
 *                 example: '2024-06-15'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid book data or referenced author does not exist
 *       409:
 *         description: Duplicate book ID
 *       500:
 *         description: Unable to create book
 */
router.post('/books', createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 example: '2025-01-20'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book data or referenced author does not exist
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to update book
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book's ID
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to delete book
 */
router.delete('/books/:id', deleteBook);

export default router;
