const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
});

const registerEmail = async (useremail, user) => {
    try {
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Waves guitars',
                link: `${process.env.EMAIL_MAIL_URL}`,
            },
        });

        const email = {
            body: {
                name: useremail,
                intro: 'Welcome! We are very happy to have you on board',
                action: {
                    instructions: 'To validate your account, plz click here',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate your account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`,
                    },
                },
                outro: 'Need help or have any questions, Just reply to email. We would be happy to help',
            },
        };

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: useremail,
            subject: 'Welcome to waves',
            html: emailBody,
        };

        await transporter.sendMail(message);
        return true;
    } catch (err) {
        throw err;
    }
};

module.exports = { registerEmail };
