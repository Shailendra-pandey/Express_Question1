import nodemailer from 'nodemailer';

function mail(message){
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'sydnie56@ethereal.email',
            pass: 'NcUvw2b79X8hq2pKuG'
        }
    });

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(info.messageId);
        console.log(nodemailer.getTestMessageUrl(info));
        return;
    });
}

export default mail;
