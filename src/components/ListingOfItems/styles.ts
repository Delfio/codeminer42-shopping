import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerItem = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 15px;

    &:first-child {
        margin-top: 15px;
    }
`;

export const FakeImageItem = styled.div`
    width: 130px;
    height: 100px;
    background-color: grey;
`;

export const ContainerInfoItem = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
`;

export const Item = styled.div`
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ContainerButtons = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    width: 30px;
    height: 30px;
    background-color: #C4C4C4;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: background-color 0.2;

    &:hover {
        background-color: ${shade(0.2, '#C4C4C4')}
    }
`;
