import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import AddDespesa from './pages/AddDespesa'
import GestaoDespesas from './pages/GestaoDespesas'
import Cadastro from './pages/Cadastro'
import Relatorio from './pages/Relatorio'
function App() {
 
  return (
    <div className="font-poppins">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/addDespesa" element={<AddDespesa/>} />
        <Route path="/gestaoDespesas" element={< GestaoDespesas/>} />
        <Route path="/relatorio" element={<Relatorio/>} />

      </Routes>
    </BrowserRouter>
    </div>
   
  )
}

export default App
