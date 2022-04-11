import apiClient from '../back-common';

export default {
    login: function (dto, callback) {
        apiClient.post(`usuarios/login`, dto, { withCredentials: true }).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

    logout: function (dto, callback) {
        apiClient.post(`usuarios/logout`, dto, { withCredentials: true }).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    }
}

// export function getAllCategorias(callback: Function) {
//     apiClient.get(`category`).then((response) => {
//         callback(response.data, '', true);
//     }, (response) => {
//         callback(response.data, response.message, false);
//     });
// }

// export function getAllAlimentosFromCategoria(id: number, callback: Function) {
//     apiClient.get(`category/${id}/food`).then((response) => {
//         callback(response.data, '', true);
//     }, (response) => {
//         callback(response.data, response.message, false);
//     });
// }