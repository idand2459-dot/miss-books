export function RateBySelect({ val, onSelected }) {
    return (
        <select value={val} onChange={ev => onSelected(+ev.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )
}