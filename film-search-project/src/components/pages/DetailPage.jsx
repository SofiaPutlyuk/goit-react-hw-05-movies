import { useCallback, useState, useEffect } from "react"
import { useLocation, useNavigate, useParams, Link, Outlet } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import styled from "styled-components";
const DetailContainer = styled.div`
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff;
  color: #fff;
  display: flex;
  flex-direction: row;
  gap: 20px;
  width:1000px;
  align-items:center;
  margin:auto;
  height:700px;
  border-radius:20px;
  justify-content: space-evenly;
  padding: 40px 0px 40px 0px;

`
const ContainerText = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:300px;
gap:25px;
`
const Text = styled.p`
margin:0;
`
const Image = styled.img`
    width:400px;
    height:600px;
`
const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  background: linear-gradient(135deg, #ff00ff, #00ffff, #fffb00);
  background-size: 300% 300%;
  animation: neonGradient 6s ease infinite;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #fffb00;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff, 0 0 60px #fffb00;
  }

  @keyframes neonGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`
const DetailPage = () => {
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
        <>
        <Link to={backLink}><FaChevronCircleLeft /></Link>
        <DetailContainer>
              <div>
            <Image src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt={detail.original_title || detail.name}  />
            </div>
            <ContainerText>
            <Text>{detail.original_title || detail.name}</Text>
            <Text>User score: {Math.round(detail.vote_average * 10)}%</Text>
            <Text>Overview</Text>
            <Text>{detail.overview}</Text>
            {detail.genres && detail.genres.map((genre , index) => (
                <Text key={index}>{genre.name}</Text>
            ))}
            <Button onClick={handleToggleCast}>
                Cast
            </Button>
            <Button onClick={handleToggleReview}>Review</Button>
            </ContainerText>
        </DetailContainer>
         <Outlet />
        </>
    )
}
export default DetailPage;