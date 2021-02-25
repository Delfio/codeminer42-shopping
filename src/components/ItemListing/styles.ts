import styled from 'styled-components';

export const Container = styled.div`
    grid-area: LI;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
    list-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    padding: 25px;
    margin: 0;
    li{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 20px;
        overflow: hidden;
        background-color: #C4C4C4;

        > strong {
            font-size: 16px;
            line-height: 20px;
            color: grey;
            font-weight: bold;
            margin-left: 10px;
            margin-top: 5px;
        }

    }
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding: 10px 25px 0;
    background-color: white;
    height: 13%;
`;

export const ContainerBotom = styled.div`
    display: flex;
    flex-direction: column;
    height: 20%;
    min-height: 80px;
    width: 100%;
    align-items: stretch;

    justify-content: space-between;
    background-color: white;
    button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #949494;
        color: #fff;
        border: 0;
        overflow: hidden;
        padding: 12px;

        display: flex;
        align-items: center;
        transition: background 0.2s;

        &:hover{
        }
    }

    div {
        display: flex;
        justify-content: space-around;
        flex: 1;
        align-items: center;
    }
`;
