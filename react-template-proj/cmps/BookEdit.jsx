import { bookService } from '../services/book.service.js'

export function BookEdit({ onDone }) {
    const [title, setTitle] = React.useState('')
    const [price, setPrice] = React.useState('')

    function onSave(ev) {
        ev.preventDefault()
        const book = {
            title: title,
            subtitle: '',
            authors: ['Unknown'],
            publishedDate: new Date().getFullYear(),
            description: 'No description yet',
            pageCount: 100,
            categories: ['General'],
            thumbnail: 'http://coding-academy.org/books-photos/1.jpg',
            language: 'en',
            listPrice: { amount: +price, currencyCode: 'EUR', isOnSale: false }
        }
        bookService.save(book).then(onDone)
    }

    return (
        <form onSubmit={onSave}>
            <h2>Add Book</h2>
            <input type="text" placeholder="Title" value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <input type="number" placeholder="Price" value={price}
                onChange={ev => setPrice(ev.target.value)} />
            <button>Save</button>
            <button type="button" onClick={onDone}>Cancel</button>
        </form>
    )
}