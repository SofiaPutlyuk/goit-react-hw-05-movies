import { useEffect, useCallback, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components";
const CastList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
const CastPhoto = styled.img`
     width: 150px;
  border-radius: 12px;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff;
  margin-bottom: 10px;
`
 const Cast = () => {
    const [cast, setCast] = useState([])
    const { movieId } = useParams()
    const fetchCast = useCallback(async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM1NzA3ZDU5ZTk0MTZiYmMyM2JlZWRhNDY2YTJiNyIsIm5iZiI6MTc1NTQzMzY1My4zMjcwMDAxLCJzdWIiOiI2OGExY2FiNWZmZjYyOGFmNGQ3NDRmZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kUIfwSKrd1j828JlPFtdqbXgRMfeqiNF9aslVp-PlYw'
            }
        })
        const data = await response.json()
        setCast(data.cast)
    }, [movieId])
    useEffect(() => {
        fetchCast()
    }, [fetchCast])
    console.log(cast)
    return (
        <CastList>
            {cast.map((actor) => (
                <li>
                    <p>{actor.name}</p>
                    <CastPhoto src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name}/>
            </li>
            ))}
        </CastList>
    )
}
export default Cast;