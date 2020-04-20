const imp = require('../import.js');
const nodemailer = imp.nodemailer();
const fs = imp.fs();
const cst = imp.cst();
const mailProperties = JSON.parse(fs.readFileSync(cst.PATH_CONF_MAIL));

async function sendMail(mail, token){

    let transporter = nodemailer.createTransport({
        service: mailProperties.email_service,
        auth: {
            user: mailProperties.email_adress,
            pass: mailProperties.email_password
        }
   });

    let info = await transporter.sendMail({
        from: '"Trasho" <'+ mailProperties.email_adress+ '>',
        to: mail,
        subject: "Bienvenue chez Trasho - Confirmez votre adresse mail",
        text: "Hello new world", // plain text body
        html: "<b>Hello new world</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {sendMail};