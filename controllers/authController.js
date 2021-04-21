const sgMail = require('@sendgrid/mail');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  const data = await User.create(req.body);
  sgMail.setApiKey(process.env.sendgrid);
  const msg = {
    to: data.email,
    from: {
      name: 'MOVIEEX',
      email: 'rajakishorbeeravalli@gmail.com'
    },
    subject: 'HELLO FROM MOVIEEX',
    text:
      'welcome ,hope you find what your searching for ,have a nice day,team movieex,Beeravalli Raja Kishor Reddy,ceo',
    html:
      '<h1>Welcome To movieex</h1><h3>hope you find what are you looking for!</h3><img src="https://i.postimg.cc/G20vfFMt/movieex7.png" alt=:img/><h3>still confused what to watch? Explore movieex for more information!</h3><h4>Team movieex,</h4><h4>Raja Kishor Reddy,</h4><h4>CEO.</h4><h5>contact me if any problem || rajakishorbeeravalli@gmail.com </h5>'
  };
  sgMail.send(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent successful');
    }
  });
  res.status(200).json({
    status: 'success',
    data
  });
});
