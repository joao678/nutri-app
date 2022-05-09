export default {
    create: async function (obj, entidadeSequelize) {
        return entidadeSequelize.create(obj).then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}