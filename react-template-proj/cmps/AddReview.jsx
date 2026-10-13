import { RateBySelect } from './dynamic-inputs/RateBySelect.jsx'
import { RateByTextbox } from './dynamic-inputs/RateByTextbox.jsx'
import { RateByStars } from './dynamic-inputs/RateByStars.jsx'

const cmpTypes = {
    select: RateBySelect,
    textbox: RateByTextbox,
    stars: RateByStars
}

export function AddReview({ onAddReview }) {
    const [review, setReview] = React.useState({
        fullname: '',
        rating: 1,
        readAt: '',
        txt: ''
    })
    const [cmpType, setCmpType] = React.useState('select')

    function handleChange(ev) {
        const { name, value } = ev.target
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }))
    }

    function onSetRating(rating) {
        setReview(prevReview => ({
            ...prevReview,
            rating
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

            <span>Rate by:</span>
            <div className="rate-types">
                <label>
                    <input type="radio" name="cmpType" value="select"
                        checked={cmpType === 'select'}
                        onChange={ev => setCmpType(ev.target.value)} />
                    Select
                </label>
                <label>
                    <input type="radio" name="cmpType" value="textbox"
                        checked={cmpType === 'textbox'}
                        onChange={ev => setCmpType(ev.target.value)} />
                    Textbox
                </label>
                <label>
                    <input type="radio" name="cmpType" value="stars"
                        checked={cmpType === 'stars'}
                        onChange={ev => setCmpType(ev.target.value)} />
                    Stars
                </label>
            </div>

            <DynamicRateCmp cmpType={cmpType} val={review.rating} onSelected={onSetRating} />

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

function DynamicRateCmp({ cmpType, ...props }) {
    const Cmp = cmpTypes[cmpType]
    if (!Cmp) return null
    return <Cmp {...props} />
}