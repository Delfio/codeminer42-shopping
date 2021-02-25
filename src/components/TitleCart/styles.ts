import styled from 'styled-components';

export const Container = styled.header`
    grid-area: TC;
    display: flex;
    color: grey;
    padding: 10px 25px 0;
    background-color: #F5F5F6;

    div {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        flex: 1;
        flex-direction: row;
        border-bottom: 1px solid grey;
        h2 {
            display: flex;
            font-weight: bold;
        }
    }
`;
