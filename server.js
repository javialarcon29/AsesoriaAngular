// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');  // Añadimos bcrypt

app.use(express.json());
app.use(cors());

const pool = require('./server/mysqlconfig');

// Ruta para el login
app.post('/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ message: 'Bad request, missing user or password' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const usuario = rows[0];

    // Comparar la contraseña ingresada con la contraseña encriptada almacenada
    const isPasswordValid = await bcrypt.compare(password, usuario.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para el registro
app.post('/register', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ message: 'Bad request, user or password not found' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);

    if (rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10); // El número 10 es el número de rondas de sal (cost)

    // Guardar el nuevo usuario con la contraseña encriptada
    const [result] = await pool.query('INSERT INTO usuarios (user, password) VALUES (?, ?)', [user, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
