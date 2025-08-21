import { useCallback, useState, useEffect } from "react"
import { useLocation, useNavigate, useParams, Link, Outlet } from "react-router-dom"
export const DetailPage = () => {
    const [detail, setDetail] = useState([])
    const { movieId } = useParams()
    const location = useLocation()
    const mediaType = location.state?.media_type || "movie";
    const backLink = location.state?.from || "/"
    const navigate = useNavigate()
    const fetchDetails = useCallback(async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw'
            }
        })
        const data = await response.json()
        setDetail(data)
    }, [movieId , mediaType])
    useEffect(() => {
        fetchDetails()
    }, [fetchDetails])
    console.log(detail)
    const handleToggleCast = () => {
     if(location.pathname.endsWith("/cast")){
        navigate(`/movies/${movieId}`)
     } else {
        navigate(`/movies/${movieId}/cast`)
     }
    }
    const handleToggleReview = () => {
        if(location.pathname.endsWith("/review")){
            navigate(`/movies/${movieId}`)
        }else {
            navigate(`/movies/${movieId}/review`)
        }
    }
    return (
        <div>
            <Link to={backLink}>Go back</Link>
            <p>{detail.original_title || detail.name}</p>
            <p>User score: {Math.round(detail.vote_average * 10)}%</p>
            <img src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt={detail.original_title || detail.name}  />
            <p>Overview</p>
            <p>{detail.overview}</p>
            {detail.genres && detail.genres.map((genre , index) => (
                <p key={index}>{genre.name}</p>
            ))}
            <button onClick={handleToggleCast}>
                Cast
            </button>
            <button onClick={handleToggleReview}>Review</button>
            <Outlet />
        </div>
    )
}