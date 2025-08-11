require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/env.js', (req, res) => {
  res.type('application/javascript');
  res.send(
    `window.env = {
      EMAIL: "${process.env.EMAIL}",
      SENHA: "${process.env.SENHA}",
      EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY}",
      EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID}",
      EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID}"
    };`
  );
});

app.use(express.static(path.join(__dirname, 'web')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'login', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});