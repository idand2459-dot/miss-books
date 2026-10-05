import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
const demoBooks = [
    { id: 'g101', title: 'The Three Musketeers' },
    { id: 'g102', title: 'The Three Bears' },
    { id: 'g103', title: 'The Three Gifts' }
]

export function BookAdd() {

    function onAddBook(book) {
        bookService.addGoogleBook(book)
            .then(() => {
                showSuccessMsg('Book added')
            })
            .catch(err => {
                showErrorMsg('Cannot add book')
            })
        
    }
    return (
        <section className="book-add">
            <h2>Add a book from Google</h2>
            <ul className="google-book-list clean-list">
                {demoBooks.map(book => (
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <button onClick={() => onAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}