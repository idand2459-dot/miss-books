const { Link } = ReactRouterDOM;

export function BookPreview({ book, onRemoveBook }) {
    return (
        <article className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} />
             <p>Author: {book.authors.join(', ')}</p>
            <p>{book.listPrice.amount.toLocaleString('en', { style: 'currency', currency: book.listPrice.currencyCode })}</p>
            <div className="actions">
                <Link to={`/book/${book.id}`} className="details-link">Details</Link>
                <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            </div>
        </article>
    )
}