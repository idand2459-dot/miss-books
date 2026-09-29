import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { bookService } from './services/book.service.js'

export function App() {

    const [page, setPage] = React.useState('home')

    return (
        <section className="app">
            <header className="app-header main-layout">
                <h1>Miss Books</h1>
                <nav>
                    <button onClick={() => setPage('home')}>Home</button>
                    <button onClick={() => setPage('books')}>Books</button>
                    <button onClick={() => setPage('about')}>About Us</button>
                </nav>
            </header>
            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'books' && <BookIndex />}
                {page === 'about' && <AboutUs />}
            </main>
        </section>
    )
}