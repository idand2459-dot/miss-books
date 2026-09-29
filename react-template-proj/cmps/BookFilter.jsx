export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = React.useState(filterBy)

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updated = Object.assign({}, filterByToEdit, { [field]: value })
        setFilterByToEdit(updated)
        onSetFilter(updated)
    }

    return (
        <section className="book-filter">
            <input
                type="text"
                name="txt"
                placeholder="Search by title"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
            <input
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={filterByToEdit.minPrice}
                onChange={handleChange}
            />
        </section>
    )
}