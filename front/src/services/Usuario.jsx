import apiClient from '../back-common';

export default {
    cadastrar: function (dto, callback) {
        apiClient.post(`usuarios/create`, dto).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

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
    },

    recuperarSenha: function (dto, callback) {
        apiClient.post(`usuarios/recuperar-senha`, dto).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

    alterarSenha: function (dto, callback) {
        apiClient.post(`usuarios/alterar-senha`, dto).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

    confirmar: function (dto, callback) {
        apiClient.post(`usuarios/confirmar`, dto).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },
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