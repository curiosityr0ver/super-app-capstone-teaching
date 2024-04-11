import Registration from "./pages/registration/Registration";
import GenrePage from "./pages/genre/GenrePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/Homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
