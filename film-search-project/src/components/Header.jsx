import { Link } from "react-router-dom"
import styled from "styled-components";
const HeaderContainer = styled.header`
width:1440px;
height:50px;
background: linear-gradient(135deg, #ff00ff, #00ffff, #fffb00);
background-size: 400% 400%;
animation: neonGradient 8s ease infinite;
 @keyframes neonGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.6),
              0 0 80px rgba(0, 255, 255, 0.6),
              0 0 120px rgba(255, 251, 0, 0.6);
`
const NeonLink = styled(Link)`
  text-decoration:none;
 font-size: 20px;
  font-weight: bold;
  color: #00ffff;
`
const LinkContainer = styled.ul`
 display:flex;
  gap:20px;
  margin:0;
   padding-top: 10px;
`
export const Header = () => {
    return (
        <HeaderContainer>
            <nav>
                <LinkContainer>
                    <NeonLink to="/">Home</NeonLink>
                    <NeonLink to="/search">Movies</NeonLink>
                </LinkContainer>
            </nav>
        </HeaderContainer>
    )
}