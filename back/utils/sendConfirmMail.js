const imp = require('../import.js');
const nodemailer = imp.nodemailer();
const fs = imp.fs();
const cst = imp.cst();
const property = imp.prop();
const mailProperties = JSON.parse(fs.readFileSync(cst.PATH_CONF_MAIL));

async function sendMail(mail, token){

    let transporter = nodemailer.createTransport({
        service: mailProperties.email_service,
        auth: {
            user: mailProperties.email_adress,
            pass: mailProperties.email_password
        }
    });

    const url_to_confirm = cst.URL + property.url_utilisateur + "/confirmMail/" + token;

    let info = await transporter.sendMail({
        from: '"Trasho" <'+ mailProperties.email_adress+ '>',
        to: mail,
        subject: "Trasho - Confirmez votre adresse mail",
        text: "Bienvenue chez Trasho - Cliquez votre email ici : " + url_to_confirm, // plain text body
        html: "<h1>Bienvenue chez Trasho</h1><br/>"+
            "Confirmez votre mail en suivant <a href=" + url_to_confirm +">ce lien</a>" // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {sendMail};