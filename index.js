const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const config = require('./config.js');

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);

OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

const sendMail = (name, recipient) => {
  // generate new access-token
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'leonardo.workflowu@gmail.com',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken,
    },
  });

  const mailOptions = {
    from: `WorkflowU-TEST <${config.user}>`,
    to: recipient,
    subject: `A message from the G.O.A.T`,
    html: getHtmlMessage(name),
  };

  transport.sendMail(mailOptions, (error, result) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success:', result);
    }

    transport.close();
  });
};

const getHtmlMessage = (name) => {
  return `
    <h3> ${name}! Hello ${name}. </h3>
  `;
};

sendMail('MichaelJordan', 'dindo.test@gmail.com');
