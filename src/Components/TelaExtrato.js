import styled from "styled-components";
import axios from "axios";

import UserContext from "./contexts/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TelaExtrato() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [balance, setBalance] = useContext([]);

    useEffect(() => {
        const token = user.token;
        axios.get('/extrato', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setBalance([...response.data])
        }).catch(error => {
            console.log(error);
        })
    }, [])

    function geraExtrato() {

    }

    return (
        <Container>
            <TopRow>
                <Hello>Olá, {user.nome}</Hello>
                <div>
                    <ion-icon name="log-out-outline"></ion-icon>
                </div>
            </TopRow>

            <Display>
                { balance.length === 0 ? "Não há registros de entrada ou saída" : <></> }
            </Display>

            <BottomRow>
                <Button onClick={() => navigate('/entrada')}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <ButtonText>Nova entrada</ButtonText>
                </Button>
                <Button onClick={() => navigate('/saida')}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <ButtonText>Nova saída</ButtonText>
                </Button>
            </BottomRow>
        </Container>
    )
}

const ButtonText = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 17px;
    font-weight: bold;
`

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 155px;
    height: 114px;
    background-color: #A328D6;

    padding: 11px 12px;
    box-sizing: border-box;

    border: 0;
    border-radius: 5px;
    font-size: 20px;

    color: white;
`

const BottomRow = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`

const Display = styled.div`
    width: 90%;
    background-color: white;
    height: 70%;
    border-radius: 5px;

    margin-bottom: 13px;
    margin-top: 55px;
`

const Hello = styled.div`
    font-size: 26px;
    font-weight: bold;
`

const TopRow = styled.div`
    font-size: 30px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;

    position: fixed;
    top: 20px;
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