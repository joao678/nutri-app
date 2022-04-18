import nodemailer from 'nodemailer';

export default function(para, assunto, corpo, cb) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joao678@gmail.com',
            pass: 'oezx ruws oviz bdrc'
        }
    });

    const mailOptions = {
        from: 'joao678@gmail.com',
        to: para,
        subject: assunto,
        html: corpo
    };

    return transporter.sendMail(mailOptions, cb);
}