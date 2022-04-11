import apiClient from '../taco-common.jsx';

export function getAlimento(id: number, callback: Function) {
    apiClient.get(`food/${id}`).then((response) => {
        callback(response.data, '', true);
    }, (response) => {
        callback(response.data, response.message, false);
    });
}

export function getAllAlimentos(callback: Function) {
    apiClient.get(`food`).then((response) => {
        callback(response.data, '', true);
    }, (response) => {
        callback(response.data, response.message, false);
    });
}