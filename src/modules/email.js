const nodemailer = require("nodemailer");

module.exports.email = async function email(to, subject, mail_body, mail_html) {
	const transport = await nodemailer.createTransport({
		host: "smtp.yandex.ru",
		port: 465,
		secure: true,
		auth: {
			user: "test@pixer.uz",
			pass: "paSS@WOrd",
		},
	});

	return await transport.sendMail({
		from: '"Bizning kompaniya" <test@pixer.uz>',
		to,
		subject,
		text: mail_body,
		html: mail_html,
	});
};
