import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { bookService } from './services/book.service.js'
import { AppHeader } from './cmps/AppHeader.jsx'

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/about" element={<AboutUs />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}

window.bookService = bookService