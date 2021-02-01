const server = require('express').Router();
const nodemailer = require('nodemailer');

server.post('/:id', async (req, res, next) => {

  const { id } = req.params; // Order id
  const { user } = req.body; // User email
  let { status } = req.body; // String pasada en OrderTable

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dailytinkerer@gmail.com',
        pass: 'ffpzqhpdrbsmdpcg' // app-specific password
      }
    });


    if (status === 'created') {
      status = {
        from: '"PCBuildHub" <dailytinkerer@gmail.com>',
        to: user,
        subject: 'Thank you for your purchase!',
        text: 'Your product will be arriving shortly.'
      };
    }

    if (status === 'cancelled') {
      status = {
        from: '"PCBuildHub" <dailytinkerer@gmail.com>',
        to: user,
        subject: 'Your order has been cancelled',
        text: "Your order has been cancelled. If you don't know why, feel free to reply to this email."
      };
    }

    if (status === 'completed') {
      status = {
        from: '"PCBuildHub" <dailytinkerer@gmail.com>',
        to: user,
        subject: `We hope you enjoy your product!`,
        html: `<a href="http://localhost:3000/reviews/${id}">Review your product here!</a>`
      };
    }

    // if (status === 'reset') {
    //   status = {
    //     from: '"PCBuildHub" <dailytinkerer@gmail.com>',
    //     to: 'dailytinkerer@gmail.com',
    //     subject: 'Password Reset',
    //     html: '<a href="http://localhost:3000/changePassword">Please, follow this link to reset your password.</a>'
    //   };
    // }


    await transporter.sendMail(status);
    res.send('Done');
  } catch (error) {
    next(error);
  }
});

module.exports = server;