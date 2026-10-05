import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutGoal } from "./cmps/AboutGoal.jsx"
import { bookService } from "./services/book.service.js"

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

                        <Route path="/about" element={<AboutUs />}>
                            <Route index element={<AboutTeam />} />
                            <Route path="team" element={<AboutTeam />} />
                            <Route path="goal" element={<AboutGoal />} />
                        </Route>

                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/add" element={<BookAdd />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Routes>
                    <UserMsg />
                </main>
            </section>
        </Router>
    )
}

window.bookService = bookService