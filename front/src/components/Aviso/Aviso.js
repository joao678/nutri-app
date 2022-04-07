export function aviso(message) {
    return {
        header: 'Alerta',
        message: message,
        buttons: ['Ok']
    };
}