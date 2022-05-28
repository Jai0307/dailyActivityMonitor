import nodemailer from 'nodemailer'
import logger from './logger'
var fs = require('fs')

export const sendEmailVerificationCode = async (
  toEmailAddress: string,
  verificationcode: number,
) => {
  logger.info(`sending email verification code to ${toEmailAddress}`)

  let subject = 'Daily Activity Monitor - email verification code'
  let message = `<h1>Welcome</h1><p>Thank you for registering!<br><br> Your email verification code: <br>${verificationcode}<br><br>`

  await sendEmail(toEmailAddress, subject, message)
}

export const sendWelcomeEmail = async (toEmailAddress: string) => {
  logger.info(`sending welcome email to ${toEmailAddress}`)

  let subject = 'Daily Activity Monitor - email verification code'
  let message = `<h1>Welcome</h1><p>Welcome, <br>
  <br>
  
  <br><br>
  DAM <br> https://dailyactivitymonitor.org/login</p>`

  await sendEmail(toEmailAddress, subject, message)
}

export const sendPasswordResetLink = async (
  toEmailAddress: string,
  temppassword: number,
) => {
  logger.info(`sending password link to ${toEmailAddress}`)

  let link = `<a style="background-color:#bf40bf;color:#ffffff;padding: 10px; font-size:16px; font-weight: 700; text-decoration:none;border-radius: 3px;" href="https://dailyactivitymonitor.org/changepassword?email=${toEmailAddress}&code=${temppassword}">Reset Password</a>`

  let subject = 'https://dailyactivitymonitor.org - password reset link'
  let message = `<h4>Hello,</h4><p>We received a request to reset your Kartera account password. <br><br>You can reset your password by clicking the link below:<br><br><br>${link}</p><br><br>If you did not request a password reset link please ignore this email.<br><br> Sincerely,<br>DAM Team`

  await sendEmail(toEmailAddress, subject, message)
}


export const sendEmail = async (
  toEmailAddress: string,
  subject: string,
  message: string,
) => {
  const myhost = 'kartera.org'

  var transporter = await nodemailer.createTransport({
    host: myhost,
    port: 465,
    secure: true, // use TLS
    auth: {
      user: `donotreply@kartera.org`,
      pass: 'L]Y=NUK{+t(U',
    },
    tls: {
      rejectUnauthorized: true,
    },
  })

  var mailOptions = {
    from: 'donotreply@damusa.org',
    to: toEmailAddress,
    subject: subject,
    html: message,
  }

  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      logger.error(error)
    } else {
      logger.info('Email sent: ' + info.response)
    }
  })
}

export const sendEmailToAdmin = async (subject: string, message: string) => {
  const toEmailAddress: string = 'jai.singh3507@gmail.com'
  const myhost = 'kartera.org'

  var transporter = await nodemailer.createTransport({
    host: myhost,
    port: 465,
    secure: true, // use TLS
    auth: {
      user: `donotreply@kartera.org`,
      pass: 'L]Y=NUK{+t(U',
    },
    tls: {
      rejectUnauthorized: true,
    },
  })

  var mailOptions = {
    from: 'donotreply@damusa.org',
    to: toEmailAddress,
    subject: subject,
    html: message,
  }

  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      logger.error(error)
    } else {
      logger.info('Email sent: ' + info.response)
    }
  })
}
