const nodeMailer=require('nodemailer');
exports.sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "29ef934845a0d9",
      pass: "e1890d25daaf21",},});
    const mailOptions={
        from:"",
        to: options.email,
        subject:options.subject,
        text:options.message,
    }
    await transporter.sendMail(mailOptions);
}