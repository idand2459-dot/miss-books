import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from '../cmps/BookEdit.jsx'

export function BookIndex() {
    const [books, setBooks] = React.useState([])
    const [selectedBookId, setSelectedBookId] = React.useState(null)
    const [filterBy, setFilterBy] = React.useState({ txt: '', minPrice: '' })
    const [isAdding, setIsAdding] = React.useState(false)

    React.useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksFromStorage => setBooks(booksFromStorage))
    }

    function onDoneAdding() {
        setIsAdding(false)
        loadBooks()
    }

     function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }


    if (selectedBookId) {
        return <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
    }

    if (isAdding) {
        return <BookEdit onDone={onDoneAdding} />
    }

   
    return (
        <section>
            <h2>Books: {books.length}</h2>
            <button onClick={() => setIsAdding(true)}>Add Book</button>
            <BookFilter filterBy={filterBy} onSetFilter={setFilterBy} />
            <BookList books={books} onSelectBook={setSelectedBookId} onRemoveBook={onRemoveBook} />
        </section>
    )
}