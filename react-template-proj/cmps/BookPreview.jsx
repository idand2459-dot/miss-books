export function BookPreview({ book, onSelectBook, onRemoveBook }) {
    return (
        <article className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} />
            <p>{book.listPrice.amount}</p>
            <button onClick={() => onSelectBook(book.id)}>Details</button>
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>

        </article>
    )
}