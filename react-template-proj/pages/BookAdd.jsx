import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function BookAdd() {
    const [txt, setTxt] = React.useState('')
    const [googleBooks, setGoogleBooks] = React.useState([])

    function onSearch(ev) {
        ev.preventDefault()
        googleBookService.query(txt)
            .then(items => setGoogleBooks(items))
            .catch(() => showErrorMsg('Cannot search books'))
    }

    function onAddBook(item) {
        bookService.addGoogleBook(item)
            .then(() => showSuccessMsg('Book added'))
            .catch(err => showErrorMsg(err.message || 'Cannot add book'))
    }

    return (
        <section className="book-add">
            <h2>Add a book from Google</h2>

            <form onSubmit={onSearch}>
                <input type="text" placeholder="Search a book..."
                    value={txt} onChange={ev => setTxt(ev.target.value)} />
                <button>Search</button>
            </form>

            <ul className="google-book-list clean-list">
                {googleBooks.map(item => (
                    <li key={item.id}>
                        <span>{item.volumeInfo.title}</span>
                        <button onClick={() => onAddBook(item)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}