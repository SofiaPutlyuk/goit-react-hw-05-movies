import { Link } from "react-router-dom"
export const Header = () => {
    return(
        <header>
            <nav>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/search">Movies</Link>
                </ul>
            </nav>
        </header>
    )
}