import {BookPreview} from './BookPreview.jsx'

export function BookList({ books, onSelectBook, onRemoveBook }) {
    return (
        <section>
            <ul className="book-list clean-list">
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />
                    </li>
                ))}
            </ul>
        </section>
    )
}