import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export const Trending = () => {
    const [trending, setTrending] = useState([])
    const location = useLocation()
    const fetchTrending = useCallback(async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw'
            }
        })
        const data = await response.json();
        setTrending(data.results)
    }, [])
    useEffect(() => {
        fetchTrending()
    }, [fetchTrending])
    console.log(trending)
    return (
        <ul>
            {trending.map((link) => (
                <li>
                    <Link to={`/movies/${link.id}`} state={{from: location, media_type:link.media_type}}>{link.original_title || link.original_name}</Link>
                </li>
            ))}
        </ul>
    )
}