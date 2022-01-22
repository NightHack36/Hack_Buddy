import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (to: string, subject: string, body: string) => {
  const email: any = process.env.EMAIL_USER;
  const password: any = process.env.EMAIL_PASSWORD;
  console.log(email, password);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
  const mailOptions = {
    from: email,
    to: to,
    subject: subject,
    text: body,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else return true;
  });
};
