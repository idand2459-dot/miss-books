import {eventBusService} from '../services/event-bus.service.js'
export function UserMsg() {
    const [msg, setMsg] = React.useState(null)

    React.useEffect(() => {
         eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                setMsg(null)
            }, 2000)
        })
    }, [])

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>
            <h3>{msg.txt}</h3>
        </section>
    )
}

    
     