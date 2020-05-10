const transporter = require('nodemailer').createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports.sendEmail = async (recepients, subject, body, isHtml) => {
    let options = {
        from: `SDC Showroom Server <${process.env.EMAIL_ADDRESS}>`,
        to: recepients,
        subject
    };
    if (isHtml)
        options.html = body;
    else
        options.text = body;

    await transporter.sendMail(options);
};