import {BookPreview} from './BookPreview.jsx'

export function BookList({ books, onSelectBook }) {
    return (
        <section>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} onSelectBook={onSelectBook} />
                    </li>
                ))}
            </ul>
        </section>
    )
}