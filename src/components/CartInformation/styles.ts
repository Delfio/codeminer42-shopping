import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CI;
    padding: 0 25px 0;
    background-color: #F5F5F6;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ContainerCupom = styled.section`
    display: flex;
    margin-top: 15px;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 15px 0;
    height: 50px;

    margin-bottom: 15px;
    button {
        width: 110px;
        height: 100%;
        background-color: #949494;
        border: none;
        color: white;
        font-weight: bold;
        font-family: 'Roboto', serif;
        border-radius: 5px;
    }

    input {
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 5px;
        width: 70%;
        font-family: 'Roboto', serif;
        padding: 0 15px 0;
    }
`;

export const CointainerInformationsOfCart = styled.section`
    display: flex;
    flex-direction: row;
    min-height: 50px;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(0,0,0,0.2);
`;
