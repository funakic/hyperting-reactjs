import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3343',
    headers: {
        Authorization: `Bearer ${cookies['hyperting.token']}`
    }
})