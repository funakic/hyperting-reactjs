import React, { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "./styles";
import { useHistory } from 'react-router-dom';

export function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    async function handleLogin() {
        try {
            await signIn({ email, password })

            history.push('/products')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <div>
                <h1>Login</h1>

                <main>
                    
                    <fieldset>
                        <input
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                    </fieldset>

                    <footer>
                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </footer>
                </main>
            </div>
        </Container>
    );
}