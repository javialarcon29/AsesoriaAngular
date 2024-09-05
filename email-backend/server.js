const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { to, subject, phone, text } = req.body;

  console.log(phone);  // Verifica que se recibe el teléfono en la consola

  // Configura el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'javielafrikano@gmail.com', // Reemplaza con tu correo electrónico
      pass: 'nmlj ycqg qzqc mels', // Reemplaza con tu contraseña de aplicación de Gmail
    },
  });

  const mailOptions = {
    from: 'javielafrikano@gmail.com',
    to,
    subject,
    text: `Teléfono: ${phone}\n\nMensaje: ${text}`,  // Incluye el teléfono y el mensaje en el correo
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Correo enviado: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

