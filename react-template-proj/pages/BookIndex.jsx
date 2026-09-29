import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

export function BookIndex(){

    const [books, setBooks] = React.useState([])
    const [selectedBook, setSelectedBook] = React.useState(null)

       

    React.useEffect(() => {
        bookService.query()
            .then(booksFromStorage => setBooks(booksFromStorage))
    }, [])

return (
    <section>
        {selectedBook ? (
            <BookDetails bookId={selectedBook} onBack={() => setSelectedBook(null)} />
        ) : (
            <React.Fragment>
                <h2>Books:{books.length}</h2>
                <BookList books={books} onSelectBook={setSelectedBook} />
            </React.Fragment>
        )}
    </section>
)
}