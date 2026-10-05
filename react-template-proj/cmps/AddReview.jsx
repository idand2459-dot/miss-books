export function AddReview({ onAddReview }) {
    const [review, setReview] = React.useState({
        fullname: '',
        rating: 1,
        readAt: '',
        txt: ''
    })

    function handleChange(ev) {
        const { name, value } = ev.target
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onAddReview(review)
        setReview({
            fullname: '',
            rating: 1,
            readAt: '',
            txt: ''
        })
    }

    return (
        <form className="add-review" onSubmit={onSubmit}>
            <h4>Add a review</h4>

            <label htmlFor="fullname">Full name:</label>
            <input type="text" id="fullname" name="fullname"
                value={review.fullname} onChange={handleChange} required />

            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating" value={review.rating} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <label htmlFor="readAt">Read at:</label>
            <input type="date" id="readAt" name="readAt"
                value={review.readAt} onChange={handleChange} />

            <label htmlFor="txt">Your review:</label>
            <textarea id="txt" name="txt"
                value={review.txt} onChange={handleChange}></textarea>

            <button>Submit Review</button>
        </form>
    )
}