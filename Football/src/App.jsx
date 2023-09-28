import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MatchContextProvider } from "./context/MatchContext";
import Layout from "./Layout";
import Home from './Home'
import MesMatch from "./MesMatch";

import './App.css'
import './index.css'


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MatchContextProvider><Home /></MatchContextProvider>} />
              <Route path="/mesmatch" index element={<MatchContextProvider><MesMatch/></MatchContextProvider>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App
