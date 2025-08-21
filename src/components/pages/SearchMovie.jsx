import { useState, useCallback, Fragment } from "react";
import { GiSpiralLollipop } from "react-icons/gi";
import styled from "styled-components";
import { Link } from "react-router-dom";
const NeonForm = styled.form`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, #33ff81, #eb2424);
  box-shadow: 0 0 20px #00ffff, 0 0 40px #ff00ff;
  margin: 50px;
  height: 250px;
  flex-direction: column;
  justify-content: space-evenly;
`
const NeonInput = styled.input`
    padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  color: #fff;
  background: #3999ff;
  outline: none;
  box-shadow: 0 0 10px #00ffff, inset 0 0 10px #ff00ff;
  transition: 0.3s;
    &:focus {
    box-shadow: 0 0 20px #00ffff, inset 0 0 15px #ff00ff;
  }
`
const NeonButton = styled.button`
 border: none;
  border-radius: 12px;
  width:40px;
  height:40px;
  font-size: 18px;
  font-weight: bold;
  color: #793c79;
  cursor: pointer;
  background: linear-gradient(135deg, #ff00ff, #00ffff, #fffb00);
  background-size: 300% 300%;
  box-shadow: 0 0 10px #00ffff, 0 0 20px #ff00ff, 0 0 30px #fffb00;
`
const NeonLabel = styled.label`
    display: flex;
    gap: 20px;
    align-items: center;
`
const NeonTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #00ffff;
  text-shadow: 
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    0 0 20px #ff00ff,
    0 0 30px #ff00ff,
    0 0 40px #fffb00,
    0 0 50px #fffb00,
    0 0 60px #ff00ff;
  background: linear-gradient(90deg, #ff00ff, #00ffff, #fffb00);
  background-clip: text;
    color: transparent;
    animation: neonGlow 2s ease-in-out infinite alternate;

  @keyframes neonGlow {
    from {
      text-shadow: 
        0 0 5px #00ffff,
        0 0 10px #00ffff,
        0 0 20px #ff00ff,
        0 0 30px #ff00ff,
        0 0 40px #fffb00;
    }
    to {
      text-shadow: 
        0 0 10px #00ffff,
        0 0 20px #00ffff,
        0 0 30px #ff00ff,
        0 0 40px #ff00ff,
        0 0 50px #fffb00;
    }
  }
`
const NeonList = styled.ul`
  list-style: none;
  padding: 0;
  margin:  0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(90deg, #ff00ff, #00ffff, #fffb00);
  justify-content:center;
  align-items:center;
  padding-bottom:20px;
  padding-top:20px;
  width:500px;
  border-radius:15px;
`
const NeonListItem  = styled.li`
font-size: 20px;
`
const NeonLinkList = styled(Link)`
  text-decoration: none;
  color: #ffbf00;
  font-weight: bold;
   text-shadow: 
    0 0 5px #00ffff,
    0 0 10px #00ffff,
    0 0 20px #ff00ff,
    0 0 30px #ff00ff;
  transition: all 0.3s ease;
   &:hover {
    color: #fffb00;
    text-shadow: 
      0 0 10px #00ffff,
      0 0 20px #ff00ff,
      0 0 30px #fffb00,
      0 0 40px #ff00ff;
    transform: scale(1.05);
  }
`
 const SearchMovie = () => {
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
            <NeonForm>
                <NeonTitle>Search your favourite movie</NeonTitle>
                <NeonLabel>
                    <NeonInput type="text" placeholder="Search Movie" onChange={handleMovie} value={movie} />
                    <NeonButton onClick={(e) => { e.preventDefault(); handleSearch() }}><GiSpiralLollipop style={{width:30 , height:"auto"}}/></NeonButton>
                </NeonLabel>
            </NeonForm>
            <NeonList>
                {listMovie.map((link) => (
                    <NeonListItem>
                        <NeonLinkList to={`/movies/${link.id}`} state={{from:"/search"}}>{link.original_title}</NeonLinkList>
                    </NeonListItem>
                ))}
            </NeonList>
        </Fragment>
    )
}
export default SearchMovie;