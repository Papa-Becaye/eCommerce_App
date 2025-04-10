import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error('Please define the RESEND_API_KEY environment variable inside .env.local');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({sendTo, subject, html}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Binkeyit <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });
        if (error) {
            console.log('Error sending email: ', error.message);
            return;
        }
        return data;
    } catch (error) {
        console.log('Error sending email: ', error.message);
    }
}

export default sendEmail;
// The sendEmail function sends an email using the Resend API. It takes the name, sendTo, subject, and html as arguments and returns the data if the email is sent successfully. If there is an error, it logs the error message to the console.