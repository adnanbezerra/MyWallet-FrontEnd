import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Components/Styles/GlobalStyle';
import TelaLogin from './Components/TelaLogin';
import TelaCadastro from './Components/TelaCadastro';
import TelaEntrada from './Components/TelaEntrada';
import TelaSaida from './Components/TelaSaida';
import TelaExtrato from './Components/TelaExtrato';
import UserContext from './Components/contexts/UserContext';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState()

  return (
    <UserContext.Provider value={{user, setUser}}>
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
    </UserContext.Provider>
  );
}

export default App;