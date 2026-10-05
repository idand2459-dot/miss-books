const {Link,Outlet} = ReactRouterDOM    

export function AboutUs(){

return(
     <section>
        <h2>About Us</h2>
        <nav>
            <Link to="team" className="btn">Team</Link>
            <Link to="goal" className="btn">Goal</Link>
        </nav>
        <Outlet />
     </section>
)
}