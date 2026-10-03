export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    if (!txt) return null
    if(isExpanded) 
        return <p>{txt} <button onClick={() => setIsExpanded(false)}>Read Less</button></p>
    if(txt.length <= length) 
        return <p>{txt}</p>
    const shortText = txt.substring(0, length) + '...'
    return <p>{shortText} <button onClick={() => setIsExpanded(true)}>Read More</button></p>
}