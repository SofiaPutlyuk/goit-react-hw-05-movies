import {BrowserRouter , Routes , Route} from "react-router-dom"
import { Header } from "./components/Header";
import { Trending } from "./components/MainPage/Trending";
import { DetailPage } from "./components/pages/DetailPage";
import { Cast } from "./components/pages/Cast";
import { Review } from "./components/pages/Review";
import { SearchMovie } from "./components/pages/SearchMovie";
export const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Trending />}/>
      <Route path="/movies/:movieId" element={<DetailPage />} >
      <Route path="cast" element={<Cast />}/>
      <Route path="review" element={<Review />} />
      </Route>
      <Route path="/search" element={<SearchMovie />} />
    </Routes>
    </BrowserRouter>
  
  );
}


