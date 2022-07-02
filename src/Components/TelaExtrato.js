import styled from "styled-components";
import axios from "axios";

import UserContext from "./contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelaExtrato() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [balance, setBalance] = useState([]);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const token = user.token;

        axios.get('http://localhost:5000/extrato', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBalance(response.data);
                getSaldo();
                console.log(balance);
                console.log(saldo);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    function getSaldo() {
        for (let i = 0; i < balance.length; i++) {
            if (balance[i].tipo === 'saida') {
                const valor = balance[i].valor * -1;
                const novoValor = saldo + valor;
                setSaldo(novoValor);
            } else {
                const novoValor = saldo + balance[i].valor;
                setSaldo(novoValor);
            }
        }
    }

    function logOut() {
        const token = user.token;

        axios.delete('http://localhost:5000/logoff', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            navigate("/");
        }).catch(error => {
            console.log(error);
        })
    }

    function generateBalanceDisplay() {
        return (
            <Display>
                {balance.map(entry => {
                    return (
                        <ExpensesRow>
                            <div><Data>{entry.data}</Data><Descricao>{entry.descricao}</Descricao></div>
                            <div><Valor negativo={entry.tipo === 'saida'}>{entry.valor}</Valor></div>
                        </ExpensesRow>)
                })}
                <BalanceRow><Balance>SALDO</Balance><BalanceValue negativo={saldo < 0}>{saldo}</BalanceValue></BalanceRow>
            </Display>
        )
    }

    return (
        <Container>
            <TopRow>
                <Hello>Olá, {user.nome}</Hello>
                <div onClick={logOut}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </div>
            </TopRow>


            {balance.length === 0 ?
                <DisplayEmpty><P>Não há registros de entrada ou saída</P></DisplayEmpty>
                :
                generateBalanceDisplay()}


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

const Valor = styled.span`
    color: ${props => props.negativo ? "#C70000" : "#03AC00"};
    font-size: 16px;
    font-weight: 400;
`

const Descricao = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: black;
`

const Data = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: #C6C6C6;
    margin-right: 8px;
`

const ExpensesRow = styled.p`
    display: flex;
    justify-content: space-between;
`

const BalanceValue = styled.p`
    font-size: 17px;
    font-weight: 400;
    color: ${props => props.negativo ? "#C70000" : "#03AC00"}
`

const Balance = styled.div`
    font-size: 17px;
    font-weight: 700;
`

const BalanceRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const P = styled.div`
    width: 180px;
    display: center;
    text-align: center;
`

const DisplayEmpty = styled.div`
    width: 90%;
    background-color: white;
    height: 70%;
    border-radius: 5px;

    margin-bottom: 13px;
    margin-top: 55px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #868686;
    font-size: 20px;
    font-weight: 400;
`

const ButtonText = styled.div`
    width: 64px;
    font-size: 17px;
    font-weight: bold;
    text-align: start;
`

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 155px;
    height: 114px;
    background-color: #A328D6;

    padding: 11px 12px;
    box-sizing: border-box;

    border: 0;
    border-radius: 5px;
    font-size: 25px;

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

    color: black;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 15px;
    box-sizing: border-box;
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