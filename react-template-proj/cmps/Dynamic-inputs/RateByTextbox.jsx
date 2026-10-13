export function RateByTextbox({ val, onSelected }) {
    return (
        <input
            type="number"
            min="1"
            max="5"
            value={val}
            onChange={ev => onSelected(+ev.target.value)}
        />
    )
}