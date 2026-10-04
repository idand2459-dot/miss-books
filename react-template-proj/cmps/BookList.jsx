import {BookPreview} from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
    return (
        <section>
            <ul className="book-list clean-list">
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book}  onRemoveBook={onRemoveBook} />
                    </li>
                ))}
            </ul>
        </section>
    )
}