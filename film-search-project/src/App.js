import {BrowserRouter , Routes , Route} from "react-router-dom"
import React, { Suspense } from "react";
import { Header } from "./components/Header";
const Trending = React.lazy(() => import ("./components/MainPage/Trending"))
const DetailPage = React.lazy(() => import("./components/pages/DetailPage"))
const Cast = React.lazy(() => import("./components/pages/Cast"))
const Review = React.lazy(() => import("./components/pages/Review"))
const SearchMovie = React.lazy(() => import("./components/pages/SearchMovie"))
export const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Suspense fallback={<div>Loading page...</div>}>
    <Routes>
      <Route path="/" element={<Trending />}/>
      <Route path="/movies/:movieId" element={<DetailPage />} >
      <Route path="cast" element={<Cast />}/>
      <Route path="review" element={<Review />} />
      </Route>
      <Route path="/search" element={<SearchMovie />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
  
  );
}


