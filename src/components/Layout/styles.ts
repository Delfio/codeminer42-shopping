import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns:
        65% 35%;
    ;
    grid-template-rows:
        50px auto
    ;
    grid-template-areas:
        'TI TC'
        'LI CI';

    height: 100vh;
`;

/**
 * TI - Title of items
 * TC - Title of cart
 * LI - List of items
 * LC - List of cart
 * CI - Cart information
 */
