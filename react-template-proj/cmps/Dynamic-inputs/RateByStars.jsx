export function RateByStars({ val, onSelected }) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    style={{ cursor: 'pointer', color: star <= val ? 'gold' : 'gray' }}
                    onClick={() => onSelected(star)}
                >
                    ★
                </span>
            ))}
        </div>
    )
}