import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { books } from './books.js'



const BOOKS_KEY = 'booksDB'

_createBooks()

function _createBooks() {
    
    let booksFromStorage = storageService.loadFromStorage(BOOKS_KEY)
    if (!booksFromStorage || !booksFromStorage.length) {
        storageService.saveToStorage(BOOKS_KEY, books)
    }
}

export const bookService = {}