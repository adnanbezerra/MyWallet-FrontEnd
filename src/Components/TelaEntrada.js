import dayjs from 'dayjs';
import axios from "axios";
import { useState, useContext } from "react"
import styled from "styled-components"
import UserContext from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

export default function TelaEntrada() {

    const { user } = useContext(UserContext);
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [disable, setDisable] = useState(false);

    const data = dayjs().format("DD/MM")

    const navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault();

        setDisable(true);

        const token = user.token;
        const content = {
            valor: parseInt(valor),
            descricao,
            tipo: "entrada",
            data
        }

        axios.post('https://mywallet-backend-adnan.herokuapp.com/extrato', content, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDisable(false);
                alert("Cadastro feito com sucesso!");
                navigate("/extrato");
            })
            .catch(error => {
                setDisable(false);
                alert("Falha no cadastro! Tente novamente.")
                console.log(error);
            })
    }

    return (
        <Container>
            <TopRow>Nova entrada</TopRow>
            <Form onSubmit={submitForm}>
                <FormInput placeholder="Valor" type='text' value={valor} onChange={e => setValor(e.target.value)} />
                <FormInput placeholder="Descrição" type='text' value={descricao} onChange={e => setDescricao(e.target.value)} />
                <Button>{disable ? <ThreeDots color="white" height={80} width={50} /> : "Salvar entrada"}</Button>
            </Form>
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

    font-size: 20px;

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
`

const TopRow = styled.div`
    font-size: 30px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;

    margin-top: 25px;
    margin-bottom: 40px;
`

const Container = styled.div`
    width: 100%;
    background-color: #8c11be;
    height: 100%;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    font-size: 15px;
    color: white;
    font-weight: 700;
`