import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
 const Review = () => {
    const { movieId } = useParams()
    const [review, setReview] = useState([])
    const fetchReview = useCallback(async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw'
            }
        })
        const data = await response.json()
        setReview(data.results)
    }, [movieId])
    useEffect(() => {
        fetchReview()
    }, [fetchReview])
    console.log(review[0])
    return (
        <div>
            {review.length > 0 ? (
                <ul>
                    {review.map((elem) => (
                        <li>
                            <h2>Author: {elem.author}</h2>
                            <p>{elem.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't have any reviews for this movie</p>
            )
            }
        </div>
    )
}
export default Review;