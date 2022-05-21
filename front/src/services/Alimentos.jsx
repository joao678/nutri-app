import apiClient from '../taco-common.jsx';

export default {
    getAlimento: function(id, callback) {
        apiClient.get(`food/${id}`).then((response) => {
            callback(response.data, '', true);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    },
    
    getAllAlimentos: function(callback) {
        apiClient.get(`food`).then((response) => {
            callback(response.data, '', true);
        }, (response) => {
            callback(response.data, response.message, false);
        });
    }
}