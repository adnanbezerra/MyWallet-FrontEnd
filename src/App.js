import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Components/Styles/GlobalStyle';
import TelaLogin from './Components/TelaLogin';
import TelaCadastro from './Components/TelaCadastro';
import TelaEntrada from './Components/TelaEntrada';
import TelaSaida from './Components/TelaSaida';
import TelaExtrato from './Components/TelaExtrato';

function App() {
  return (
    <>

      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<TelaLogin />} />
          <Route path={'/cadastro'} element={<TelaCadastro />} />
          <Route path={'/extrato'} element={<TelaExtrato />} />
          <Route path={'/entrada'} element={<TelaEntrada />} />
          <Route path={'/saida'} element={<TelaSaida />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;