import Registration from "./pages/regitration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          {/* <Route path="/genre" element={<Genre />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
