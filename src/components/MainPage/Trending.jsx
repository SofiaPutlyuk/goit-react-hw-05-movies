import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
const TrendingList = styled.ul`
  background: linear-gradient(135deg, #f93d3d, #4b5de5);
  box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width:600px;
  border-radius:20px;
  justify-content:center;
  align-items:center;
  margin-top:20px;
  padding:20px 0px 20px 0px;
`;
const TrendingItem = styled.li`
  font-size: 18px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`
const TrendingLink = styled(Link)`
  text-decoration: none;
  color: #00ffff;
  font-weight: bold;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #ff00ff, 0 0 15px #fffb00;
  transition: all 0.3s ease;

  &:hover {
    color: #fffb00;
    text-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #fffb00;
  }
`
 const Trending = () => {
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
        <TrendingList>
            {trending.map((link) => (
                <TrendingItem>
                    <TrendingLink to={`/movies/${link.id}`} state={{from: location, media_type:link.media_type}}>{link.original_title || link.original_name}</TrendingLink>
                </TrendingItem>
            ))}
        </TrendingList>
    )
}
export default Trending;