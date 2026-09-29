import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { books } from './books.js'

export const bookService = {
    query,
    get,
    remove,
    save

}
  

const BOOKS_KEY = 'booksDB'

_createBooks()

function _createBooks() {
    
    let booksFromStorage = storageService.loadFromStorage(BOOKS_KEY)
    if (!booksFromStorage || !booksFromStorage.length) {
        storageService.saveToStorage(BOOKS_KEY, books)
    }
}

function query() {
    return asyncStorageService.query(BOOKS_KEY)
}

function get(bookId) {
    return asyncStorageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return asyncStorageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return asyncStorageService.put(BOOKS_KEY, book)
    } else {
        return asyncStorageService.post(BOOKS_KEY, book)
    }
}