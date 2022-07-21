import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8;
    justify-content: space-between;
    align-items: center;

    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 0.5rem;
`;

export const Content = styled.div`
    button {
        width: 70%;
        padding: 0 1.5rem;
        height: 2rem;
        background: var(--green);
        color: #FFF;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        font-weight: 400;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;