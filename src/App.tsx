import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
