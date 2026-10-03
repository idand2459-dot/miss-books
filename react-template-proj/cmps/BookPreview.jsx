export function BookPreview({ book, onSelectBook, onRemoveBook }) {
    return (
        <article className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} />
             <p>Author: {book.authors.join(', ')}</p>
            <p>{book.listPrice.amount.toLocaleString('en', { style: 'currency', currency: book.listPrice.currencyCode })}</p>
            <div className="actions">
                <button onClick={() => onSelectBook(book.id)}>Details</button>
                <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            </div>
        </article>
    )
}