import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
const  {Link} = ReactRouterDOM


export function BookIndex() {
    const [books, setBooks] = React.useState([])

    const [filterBy, setFilterBy] = React.useState({ txt: '', minPrice: '' })
    

    React.useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksFromStorage => setBooks(booksFromStorage))
    }


     function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            
            showSuccessMsg('Book removed')
        })
        .catch(err => {
            showErrorMsg('Cannot remove book')
        })
    }

    return (
        <section>
            <h2>Books: {books.length}</h2>
            <Link to="/book/edit">Add Book</Link>
            <Link to="/book/add">Add Book from Google</Link>
            <BookFilter filterBy={filterBy} onSetFilter={setFilterBy} />
            <BookList books={books}  onRemoveBook={onRemoveBook} />
        </section>
    )
}