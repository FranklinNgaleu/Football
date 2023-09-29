import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from './Home'
import MesMatch from "./MesMatch";

import './App.css'
import './index.css'
import NonJouer from "./NonJouer";
import Jouer from "./Jouer";
import Jour from "./Jour";


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/mesmatch" index element={<MesMatch/>} />
              <Route path="/nonjouer" index element={<NonJouer/>} />
              <Route path="/jouer" index element={<Jouer/>} />
              <Route path="/jour" index element={<Jour/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App
