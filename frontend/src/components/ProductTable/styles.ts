import styled from "styled-components";

export const Container = styled.div`
    text {
        margin: 1rem 1rem 1rem;
    }

    input {
        width: 30%;
        padding: 1rem 1.5rem;
        height: 2rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;
        margin-top: 1rem;
        margin-right: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin: 1rem 1rem 1rem;
        }
    }

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;
        }
    }

    button {
            font-size: 1rem;
            color: #fff;
            background: var(--blue-light);
            border: 0;
            padding: 0 2rem;
            width: 8rem;
            height: 2rem;
            border-radius: 0.8rem;
            
            text-decoration: none;

            transition: filter 0.2s;
        }
`;