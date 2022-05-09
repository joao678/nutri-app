import apiClient from '../back-common';

export default {
    adicionarAgua: function (dto, callback) {
        apiClient.post(`agua/adicionarAgua`, dto, { withCredentials: true }).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    }
}