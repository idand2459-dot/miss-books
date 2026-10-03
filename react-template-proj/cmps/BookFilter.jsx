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
            <label htmlFor="txt">Title:</label>
            <input
                type="text"
                id="txt"
                name="txt"
                placeholder="Search by title..."
                value={filterByToEdit.txt}
                onChange={handleChange}
            />

            <label htmlFor="minPrice">Min price:</label>
            <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="0"
                value={filterByToEdit.minPrice}
                onChange={handleChange}
            />
        </section>
    )
}