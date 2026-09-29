import { bookService } from '../services/book.service.js'
export function BookDetails({ onBack,bookId}) {

    const [book, setBook] = React.useState(null)

    React.useEffect(() => {
        bookService.get(bookId)
            .then(bookFromStorage => setBook(bookFromStorage))
    }, [bookId])
    return (
        <section>
            <button onClick={onBack}>Back</button>
            {book && <h2>{book.title}</h2>}
            <h3>{book.subtitle}</h3>
            <p>{book.description}</p>
            <p>Author: {book.author}</p>
            <p>Published: {book.publishedDate}</p>
            <p>Pages: {book.pageCount}</p>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <img src={book.thumbnail} alt={book.title} />
        </section>
    )
}