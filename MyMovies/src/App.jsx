import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Single_Movie from "./Components/Single_Movie/Single_Movie";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/movies/:id`} element={<Single_Movie />} />
          <Route path="/movies/type/:type" element={<Home />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
