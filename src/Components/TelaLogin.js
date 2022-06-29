import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function TelaLogin() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [disable, setDisable] = useState(false);

    let navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault();

        setDisable(true);
        const login = { email, senha };

        axios.post('http://localhost:5000/login', login)
            .then(response => {
                setDisable(false);
                const user = response.data;
                localStorage.setItem("token", user.token);
                navigate('/extrato');
            })
            .catch(error => {
                setDisable(false);
                if(error.response.status === 422) alert("Preencha todos os dados para fazer login!");
                if(error.response.status === 404||error.response.status === 401) alert("Email ou senha errados!");  
            })
    }

    return (
        <Container>
            <PageTitle>MyWallet</PageTitle>

            <Form>
                <Input placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Senha' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Button disabled={disable} onClick={submitForm}>
                    {disable ? <ThreeDots color="white" height={80} width={50} />
                        : "Entrar"}
                </Button>
            </Form>

            <Link to='/cadastro' style={{ textDecoration: 'none', color: 'white' }}>Primeira vez? Cadastre-se!</Link>
        </Container>
    )
}

const Form = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Button = styled.button`
    height: 58px;
    background-color: #A328D6;
    width: 90%;

    border-radius: 5px;
    border: 0;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 36px;
    font-size: 20px;
    color: white;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`

const Input = styled.input`
    height: 58px;
    background-color: white;
    width: 90%;

    border-radius: 5px;
    border: 0;
    box-sizing: border-box;
    padding-left: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 13px;
    font-size: 20px;
    color: black;
`

const PageTitle = styled.p`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    margin-bottom: 35px;
`

const Container = styled.div`
    width: 100%;
    background-color: #8c11be;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 15px;
    color: white;
    font-weight: 700;
`