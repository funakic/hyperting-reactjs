import styled from 'styled-components';

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        color: #fff;
    }

    .buttons-container a {
        font-size: 1rem;
        color: #fff;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        width: 30rem;
        height: 10.4rem;
        border-radius: 0.8rem;
        
        text-decoration: none;

        transition: filter 0.2s;
    }
`;