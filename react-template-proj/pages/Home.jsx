import { utilService } from '../services/util.service.js'

export function Home() {
    const h1Ref = React.useRef(null);
    const imgRef = React.useRef(null);

    function onActive() {
        utilService.animateCSS(h1Ref.current, 'rubberBand')
        .then(() => {
            utilService.animateCSS(imgRef.current, 'bounceIn')
        })
    }
    return (
        <section>
            <h2 ref={h1Ref}>Welcome To Our Books Store</h2>
            <img ref={imgRef} src="assets/BooksImages/1.jpg" alt="book" />
            <button onClick={onActive}>Activate Animation</button>
            
        </section>
    )
}
