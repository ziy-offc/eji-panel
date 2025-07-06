// server.js
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

let botProcess = null;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/bot/start', (req, res) => {
  if (botProcess) {
    return res.send('Bot sudah berjalan');
  }

  botProcess = spawn('node', ['bot.js'], {
    stdio: 'inherit',
    shell: true,
  });

  res.send('Bot dijalankan');
});

app.post('/bot/stop', (req, res) => {
  if (!botProcess) {
    return res.send('Bot belum berjalan');
  }

  botProcess.kill();
  botProcess = null;
  res.send('Bot dihentikan');
});

app.get('/bot/status', (req, res) => {
  res.send(botProcess ? 'Aktif' : 'Tidak aktif');
});

app.listen(port, () => {
  console.log(`Panel jalan di http://localhost:${port}`);
});
