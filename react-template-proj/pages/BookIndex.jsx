import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
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
        })
    }

    return (
        <section>
            <h2>Books: {books.length}</h2>
            <Link to="/book/edit">Add Book</Link>
            <BookFilter filterBy={filterBy} onSetFilter={setFilterBy} />
            <BookList books={books}  onRemoveBook={onRemoveBook} />
        </section>
    )
}