import nodemailer from 'nodemailer';

export const sendOtp = (rec,otp)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vandanv57@gmail.com',
      pass: 'uaqoedgjnvirmlza'
    }
  });
  
  var mailOptions = {
    from: 'vandanv57@gmail.com',
    to: rec,
    subject: 'Sending Email using Node.js',
    text: 'Your One Time Password '+otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log('Email sent: ' + info.response);
      return info.response;
    }
  });
}