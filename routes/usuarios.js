// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, login, nickname, email FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, login, nickname, email FROM usuarios WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { login, password, nickname, email } = req.body;
    const [result] = await db.query('INSERT INTO usuarios (login, password, nickname, email) VALUES (?, ?, ?, ?)', [login, password, nickname, email]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { login, password, nickname, email } = req.body;
    await db.query('UPDATE usuarios SET login = ?, password = ?, nickname = ?, email = ? WHERE id = ?', [login, password, nickname, email, req.params.id]);
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
