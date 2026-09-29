import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'

export function BookIndex(){

    const [books, setBooks] = React.useState([])

    React.useEffect(() => {
        bookService.query()
            .then(booksFromStorage => setBooks(booksFromStorage))
    }, [])
return(
     <section>
        <h2>Books:{books.length}</h2>
        <BookList books={books} />
     </section>
)
}