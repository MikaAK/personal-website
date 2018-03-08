const AWS = require('aws-sdk')

const createEmailParams = ({senderEmail, senderName, message}) => ({
  ReplyToAddresses: [senderEmail],
  Source: 'mikakalathil@gmail.com',
  Destination: {
    ToAddresses: ['mikakalathil@gmail.com']
  },
  Message: {
    Subject: {
      Charset: 'UTF-8',
      Data: `New Personal Website message from ${senderName} - ${senderEmail}`
    },
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: `
          <h3>You have a new message from ${senderName} ${senderEmail}</h3>

          <pre>
            ${message}
          </pre>
        `
      },
      Text: {
        Charset: 'UTF-8',
        Data: `
          You have a new message from ${senderName} ${senderEmail}

          ${message}
        `
      }
    }
  }
})


exports.sendEmail = (event, context, callback) => {
  const ses = new AWS.SES({apiVersion: '2010-12-01'})

  ses.sendEmail(createEmailParams(event), function(err, data) {
    if (err)
      throw err

    callback(null, data)
  })
}
