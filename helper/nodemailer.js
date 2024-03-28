var nodemailer = require('nodemailer');



var sendMail = async (email, name, otp) => {
  try {
    
    var dataForResetPassword = `<body style="font-family: Arial, sans-serif; background-color: lightblue; margin: 0; padding: 0;">
<div style="max-width: 600px; margin: 50px auto; padding: 30px; background-color: skyblue; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid black; text-align: center;">
  <h1 style="color: black; margin-bottom: 20px;">Reset Your Password</h1>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    Hello, <span style="color: #007bff; font-weight: bold;">${name}</span><br>
    We received a request to reset your password associated with this email address.
  </p>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    Here's your One-Time Password (OTP) to use for resetting your password:
  </p>
  <p style="font-size: 18px; background-color: #ddd; padding: 5px 10px; border-radius: 4px; margin-bottom: 20px;">
    ${otp}
  </p>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    This OTP is valid for 5 minutes. Enter it on the password reset page to create a new, strong password.
  </p>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    **Important:** If you did not request a password reset, please ignore this email or contact our support team immediately.
  </p>
  <a href="http://localhost:3000/onboarding/resetPassword" style="display: inline-block; padding: 15px 30px; background-color: red; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); cursor: pointer;">
    Reset Your Password
  </a>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    Thank you,
  </p>
  <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
   Shivam
  </p>
</div>
</body>`


    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "ajaysingh57339@gmail.com",
        pass: 'nlygcnhwwivzkbpv'
      }
    });

    var mailconfig = {
      from: "ajaysingh57339@gmail.com",
      to: email,
      subject: "For reset Password",
      html: dataForResetPassword
    }

    transporter.sendMail(mailconfig, function (err, info) {
      if (err) {
        console.log(err.message)
      } else {
        console.log("email has been sent:", info.response)
      }

    })
  } catch (error) {
    console.log(error.message);
  }
}



module.exports = { sendMail };
