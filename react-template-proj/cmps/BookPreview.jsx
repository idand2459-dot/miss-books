export function BookPreview({ book, onSelectBook, onRemoveBook }) {
    return (
        <article>
            <h3>{book.title}</h3>
            <p>{book.listPrice.amount}</p>
            <button onClick={() => onSelectBook(book.id)}>Details</button>
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>

        </article>
    )
}