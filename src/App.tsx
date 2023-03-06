import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import Itineraries from "./pages/Itineraries"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/results" element={<Itineraries />} />
      </Route>
    </Routes>  
  )
}

export default App