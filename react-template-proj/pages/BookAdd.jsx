import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {utilService} from '../services/util.service.js'

export function BookAdd() {
    const [txt, setTxt] = React.useState('')
    const [googleBooks, setGoogleBooks] = React.useState([])

    const searchDebounced = React.useRef(utilService.debounce(searchBooks, 500)).current

function searchBooks(txt) {
    if (!txt) return setGoogleBooks([])
    googleBookService.query(txt).then(items => setGoogleBooks(items))
}

function handleChange(ev) {
    const value = ev.target.value
    setTxt(value)
    searchDebounced(value)
}

    function onAddBook(item) {
        bookService.addGoogleBook(item)
            .then(() => showSuccessMsg('Book added'))
            .catch(err => showErrorMsg(err.message || 'Cannot add book'))
    }

    return (
        <section className="book-add">
            <h2>Add a book from Google</h2>

            
                <input type="text" placeholder="Search a book..."
                    value={txt} onChange={handleChange} />
                
            

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