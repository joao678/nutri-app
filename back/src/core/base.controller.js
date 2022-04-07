export default {
    create: async function (obj, res, entidadeSequelize) {
        return entidadeSequelize.create(obj).then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}