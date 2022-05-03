import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'
import * as admin from 'firebase-admin'
import * as handlebars from 'handlebars'
import orgHtmlTemplate from './static/org.html'
import orgTxtTemplate from './static/org.txt'
import parentHtmlTemplate from './static/parent.html'
import parentTxtTemplate from './static/parent.txt'
import playerHtmlTemplate from './static/player.html'
import playerTxtTemplate from './static/player.txt'

admin.initializeApp()

const orgHtml = handlebars.compile(orgHtmlTemplate)
const orgTxt = handlebars.compile(orgTxtTemplate)
const parentHtml = handlebars.compile(parentHtmlTemplate)
const parentTxt = handlebars.compile(parentTxtTemplate)
const playerHtml = handlebars.compile(playerHtmlTemplate)
const playerTxt = handlebars.compile(playerTxtTemplate)

const transporter = nodemailer.createTransport({
  host: functions.config().smtp.host,
  port: functions.config().smtp.port,
  auth: {
    user: functions.config().smtp.user,
    pass: functions.config().smtp.pass,
  },
})

type Registration = {
  address: string
  allergies: string
  dob: admin.firestore.Timestamp
  email: string
  insurance: string
  name: string
  nick: string
  parent_address: string
  parent_email: string
  parent_name: string
  parent_phone: string
  phone: string
  terms: boolean
}

exports.onRegistration = functions.firestore
  .document('/registrations/{id}')
  .onCreate(async (snap, context) => {
    const data = snap.data() as Registration

    const messages = [
      {
        type: 'player',
        message: {
          from: 'Malenovský krmelec <krmelec@malenovska.cz>',
          to: data.email,
          replyTo: 'Larpový Tábor <tabor@malenovska.cz>',
          subject: 'Larpový tábor: Registrace byla úspěšná 🎉',
          text: playerTxt(data),
          html: playerHtml(data),
        },
      },
      {
        type: 'parent',
        message: {
          from: 'Malenovský krmelec <krmelec@malenovska.cz>',
          to: data.parent_email,
          replyTo: 'Larpový Tábor <tabor@malenovska.cz>',
          subject: 'Larpový tábor: Registrace byla úspěšná 🎉',
          text: parentTxt(data),
          html: parentHtml(data),
        },
      },
      {
        type: 'org',
        message: {
          from: 'Malenovský krmelec <krmelec@malenovska.cz>',
          to: 'tumi@malenovska.cz',
          subject: `🤖 Nová registrace: ${data.name}`,
          text: orgTxt({ ...data, id: context.params.id }),
          html: orgHtml({ ...data, id: context.params.id }),
        },
      },
    ]

    messages.map(({ type, message }) => {
      functions.logger.log('Sending email', {
        to: message.to,
        type,
      })
      transporter.sendMail(message)
    })
  })
