import apiClient from '../back-common';

export default {
    recuperarExercicios: function (callback) {
        apiClient.get(`exercicio/recuperarExercicios`).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

    adicionarExercicio: function (dto, callback) {
        apiClient.post(`exercicio/adicionarExercicio`, dto, { withCredentials: true }).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    }
}