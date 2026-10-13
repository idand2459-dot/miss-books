import { bookService } from '../services/book.service.js'
import { Chart } from '../cmps/Chart.jsx'

export function Dashboard() {
    const [books, setBooks] = React.useState([])
    const [categoryStats, setCategoryStats] = React.useState([])

    React.useEffect(() => {
        bookService.query().then(setBooks)
        bookService.getCategoryStats().then(setCategoryStats)
    }, [])

    return (
        <section className="dashboard">
            <h2>Dashboard</h2>
            <h3>Statistics for {books.length} books</h3>
            <h4>Books by category</h4>
            <Chart data={categoryStats} />
        </section>
    )
}