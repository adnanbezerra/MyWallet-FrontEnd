import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ThreeDots } from 'react-loader-spinner';

export default function TelaCadastro() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [confirma, setConfirma] = useState("");
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    function submitForm(event) {
        setDisable(true);
        event.preventDefault();

        if(senha !== confirma) {
            alert("As senhas não estão iguais! Tente novamente.");
            return;
        }

        const cadastro = {
            nome,
            email,
            senha
        }

        axios.post('https://mywallet-backend-adnan.herokuapp.com/cadastro', cadastro)
            .then( response => {
                alert("Cadastro feito com sucesso!");
                setDisable(false);
                navigate("/");
            }).catch( error => {
                setDisable(false);
                if(error.response) {
                    if(error.response.status === 422) alert("Dados inválidos! Tente novamente.");
                    if(error.response.status === 409) alert("Usuário já cadastrado.");
                }
                console.log(error)
            })
    }

    return (
        <Container>
            <PageTitle>MyWallet</PageTitle>

            <Form onSubmit={submitForm}>
                <FormInput placeholder='Nome' type='text' value={nome} onChange={e => setNome(e.target.value)} />
                <FormInput placeholder='E-mail' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                <FormInput placeholder='Senha' type='password' value={senha} onChange={e => setSenha(e.target.value)} />
                <FormInput placeholder='Confirme a senha' type='password' value={confirma} onChange={ e => setConfirma(e.target.value)} />
                <Button>{disable ? <ThreeDots color="white" height={80} width={50} /> : "Cadastrar"}</Button>
            </Form>

            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Já tem uma conta? Entre agora!</Link>
        </Container>
    )
}

const FormInput = styled.input`
    width: 90%;
    border-radius: 5px;
    border: 0;
    height: 60px;
    margin-bottom: 13px;
    padding-left: 13px;
    box-sizing: border-box;

    &::placeholder {
        color: black;
        font-size: 20px;
    }
`

const Button = styled.button`
    width: 90%;
    border-radius: 5px;
    border: 0;
    height: 50px;
    background-color: #A328D6;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-weight: 700;
    color: white;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    align-items: center;
    margin-bottom: 32px;
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