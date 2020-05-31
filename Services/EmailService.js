const transporter = require('nodemailer').createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports.sendEmail = async (from, to, subject, body, isHtml) => {
    let options = {
        from: `${from} <${process.env.EMAIL_ADDRESS}>`,
        to,
        subject
    };
    if (isHtml)
        options.html = body;
    else
        options.text = body;

    await transporter.sendMail(options);
};