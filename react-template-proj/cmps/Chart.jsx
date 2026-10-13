export function Chart({ data }) {
    return (
        <ul className="chart clean-list">
            {data.map(item =>
                <li key={item.title}>
                    <span title={item.title} style={{ height: item.value + '%' }}>
                        {item.value + '%'}
                    </span>
                </li>
            )}
        </ul>
    )
}