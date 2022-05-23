import apiClientTaco from '../taco-common.jsx';
import apiClient from '../back-common';

export default {
    getAlimento: function(id, callback) {
        apiClientTaco.get(`food/${id}`).then((response) => {
            callback(response.data, '', true);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },
    
    getAllAlimentos: function(callback) {
        apiClientTaco.get(`food`).then((response) => {
            callback(response.data, '', true);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },

    adicionarAlimento: function (dto, callback) {
        apiClient.post(`alimento/adicionarAlimento`, dto, { withCredentials: true }).then((response) => {
            callback(response.data.Content, response.data.Message, response.data.Success);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    }
}