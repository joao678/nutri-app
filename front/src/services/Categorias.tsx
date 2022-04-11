import apiClient from '../taco-common.jsx';

export function getCategoria(id: number, callback: Function) {
    apiClient.get(`category/${id}`).then((response) => {
        callback(response.data, '', true);
    }, (response) => {
        callback(response.data, response.message, false);
    });
}

export function getAllCategorias(callback: Function) {
    apiClient.get(`category`).then((response) => {
        callback(response.data, '', true);
    }, (response) => {
        callback(response.data, response.message, false);
    });
}

export function getAllAlimentosFromCategoria(id: number, callback: Function) {
    apiClient.get(`category/${id}/food`).then((response) => {
        callback(response.data, '', true);
    }, (response) => {
        callback(response.data, response.message, false);
    });
}