import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { books } from './books.js'
import { utilService } from './util.service.js'

export const bookService = {
    query,
    get,
    remove,
    save,
    addReview,

}
  

const BOOKS_KEY = 'booksDB'

_createBooks()

function _createBooks() {
    
    let booksFromStorage = storageService.loadFromStorage(BOOKS_KEY)
    if (!booksFromStorage || !booksFromStorage.length) {
        storageService.saveToStorage(BOOKS_KEY, books)
    }
}

function query(filterBy = {}) {
    return asyncStorageService.query(BOOKS_KEY).then(books => {
        if (filterBy.txt) {
            const txt = filterBy.txt.toLowerCase()
            books = books.filter(book => book.title.toLowerCase().includes(txt))
        }
        if (filterBy.minPrice) {
            books = books.filter(book => book.listPrice.amount >= +filterBy.minPrice)
        }
        return books
    })
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

function addReview(bookId, review) {
    return get(bookId).then(book => {
        review.id = utilService.makeId()
        review.createAt = Date.now()            
        if (!book.reviews) book.reviews = []
        book.reviews.push(review)
        return save(book)
    }) 
}        