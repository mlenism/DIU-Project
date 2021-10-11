import oauth from './OAuth';
import nodemailer from 'nodemailer';

class Nodemailer {

  public getMailOptions(mail: string, html: string) {
    const mailOptions = {
      from: `Hotel Zulevar ${process.env.EMAIL}`,
      to: mail,
      subject: "Información de la reserva.",
      html: html
    };
    return mailOptions;
  }

  public async getTransporter() {
    const accesToken = await oauth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: `${accesToken}`,
      }
    });
    return transporter;
  }

}

const config = new Nodemailer();
export default config;