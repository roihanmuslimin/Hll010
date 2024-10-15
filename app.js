const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Array untuk menyimpan data pengguna
let users = [];

// Fungsi untuk membaca data dari file
function loadDataFromFile() {
  try {
    const data = fs.readFileSync('data.txt', 'utf8');
    users = JSON.parse(data) || []; // Parse data menjadi array objek
  } catch (err) {
    console.error('Error membaca file:', err);
  }
}

// Fungsi untuk menyimpan data ke file
function saveDataToFile() {
  try {
    const data = JSON.stringify(users);
    fs.writeFileSync('data.txt', data);
  } catch (err) {
    console.error('Error menyimpan data ke file:', err);
  }
}

// Load data saat server berjalan
loadDataFromFile();

app.use(express.json());

app.post('/saveData', (req, res) => {
  const { username } = req.body;
  const uid = generateUID(15); // Fungsi generateUID seperti sebelumnya
  users.push({ username, uid });
  saveDataToFile(); // Simpan data ke file setelah ditambahkan
  res.send('Data berhasil disimpan');
});

app.get('/loadData', (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
           
