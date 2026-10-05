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
    removeReview,
    addGoogleBook

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
        .then(book => _setNextPrevBookId(book))
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

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
        if (reviewIdx !== -1) {
            book.reviews.splice(reviewIdx, 1)
           
        }
         return save(book)
    })  
}

function _setNextPrevBookId(book) {
   return query().then(books => {
    const idx = books.findIndex(currBook => currBook.id === book.id)

    const nextBook=  books[idx + 1] ? books[idx + 1] : books[0]
    const prevBook = books[idx - 1] ? books[idx - 1] : books[books.length - 1]

    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
    })
}

function addGoogleBook(item) {
    return query().then(books => {
        const isExists = books.some(book => book.googleId === item.id)
        if (isExists) {
            throw new Error('Book already exists in the library')
        }

        const info = item.volumeInfo
        const book = {
            googleId: item.id,
            title: info.title,
            subtitle: info.subtitle || '',
            authors: info.authors || ['Unknown'],
            publishedDate: parseInt(info.publishedDate) || new Date().getFullYear(),
            description: info.description || 'No description yet',
            pageCount: info.pageCount || 100,
            categories: info.categories || ['General'],
            thumbnail: (info.imageLinks && info.imageLinks.thumbnail) || 'assets/BooksImages/1.jpg',
            language: info.language || 'en',
            listPrice: { amount: 100, currencyCode: 'EUR', isOnSale: false }
        }
        return save(book)
    })
}