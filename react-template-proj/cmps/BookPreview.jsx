export function BookPreview({ book }) {
    return (
        <article>
            <h3>{book.title}</h3>
            <p>{book.listPrice.amount}</p>
        </article>
    )
}