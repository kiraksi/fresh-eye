const { UserModel } = require('./Auth/index');
const { ItemsModel } = require('./Items/index');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'rahulshah.t4p@gmail.com',
		pass: 'rahulrahul'
	}
});

const mailDetails = {
	from: 'rahulshah.t4p@gmail.com',
	to: '',
	subject: '',
	text: ''
};

const details = {
	mTransporter: mailTransporter,
	mDetails: mailDetails
};

module.exports = details;