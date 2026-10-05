import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
    const [title, setTitle] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [bookToEdit, setBookToEdit] = React.useState(null)
    const navigate = useNavigate()
    const { bookId } = useParams()

    React.useEffect(() => {
        if (!bookId) return
        bookService.get(bookId).then(book => {
            setBookToEdit(book)
            setTitle(book.title)
            setPrice(book.listPrice.amount)
        })
    }, [bookId])

    function onSave(ev) {
        ev.preventDefault()

        const newBook = {
            title: title,
            subtitle: '',
            authors: ['Unknown'],
            publishedDate: new Date().getFullYear(),
            description: 'No description yet',
            pageCount: 100,
            categories: ['General'],
            thumbnail: 'assets/BooksImages/1.jpg',
            language: 'en',
            listPrice: { amount: +price, currencyCode: 'EUR', isOnSale: false }
        }

        const editedBook = bookToEdit && {
            ...bookToEdit,
            title: title,
            listPrice: { ...bookToEdit.listPrice, amount: +price }
        }

        const bookToSave = bookToEdit ? editedBook : newBook

        bookService.save(bookToSave)
            .then(() => {
                navigate('/book')
                showSuccessMsg(bookToEdit ? 'Book updated' : 'Book added')
            })
            .catch(err => {
                showErrorMsg(bookToEdit ? 'Cannot update book' : 'Cannot add book')
            })
    }

    return (
        <form className='book-edit' onSubmit={onSave}>
            <h2>{bookId ? 'Edit Book' : 'Add Book'}</h2>
            <input type="text" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button>Save</button>
            <button type="button" onClick={() => navigate('/book')}>Cancel</button>
        </form>
    )
}