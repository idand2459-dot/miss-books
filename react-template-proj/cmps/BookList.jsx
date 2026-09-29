import {BookPreview} from './BookPreview.jsx'

export function BookList({ books }) {
    return (
        <section>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} />
                    </li>
                ))}
            </ul>
        </section>
    )
}