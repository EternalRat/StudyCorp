import config from '../config.json';
import axios from 'axios';

export namespace API {
    export function getBlacklist() {
        return axios.get(`${config.api_url}/blacklist`, {withCredentials: true});
    }

    export function getUser() {
        return axios.get(`${config.api_url}/user`, {withCredentials: true});
    }

    export function getTicket() {
        return axios.get(`${config.api_url}/ticket`, {withCredentials: true});
    }

    export function getTicketMessages(ticketId: string) {
        return axios.get(`${config.api_url}/ticket/${ticketId}`, {withCredentials: true});
    }

    export function getVWarns() {
        return axios.get(`${config.api_url}/warns`, {withCredentials: true});
    }

    export function getAdmins() {
        return axios.get(`${config.api_url}/admin`, {withCredentials: true});
    }

    export function isAdmin() {
        return axios.get(`${config.api_url}/admin/isAdmin`, {withCredentials: true});
    }
}