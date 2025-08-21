import { useState, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";
export const SearchMovie = () => {
    const [movie, setMovie] = useState("")
    const [listMovie, setListMovie] = useState(JSON.parse(localStorage.getItem("list")) || [])
    const fetchMovie = useCallback(async (query) => {
        const key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw";
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&include_adult=false&language=en-US&page=1`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw'
            }
        })
        const data = await response.json()
        setListMovie(data.results)
        localStorage.setItem("list" , JSON.stringify(data.results))
    }, [])
    const handleMovie = (e) => {
        setMovie(e.target.value)
    }
    const handleSearch = () => {
        fetchMovie(movie)
    }
    console.log(listMovie)
    return (
        <Fragment>
            <form>
                <label>
                    <input type="text" placeholder="Search Movie" onChange={handleMovie} value={movie} />
                    <button onClick={(e) => { e.preventDefault(); handleSearch() }}>Search</button>
                </label>
            </form>
            <ul>
                {listMovie.map((link) => (
                    <li>
                        <Link to={`/movies/${link.id}`} state={{from:"/search"}}>{link.original_title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}