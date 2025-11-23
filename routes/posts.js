// routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar posts (con usuario y categoría opcional)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.id, p.titulo, p.fecha_publicacion, p.contenido, p.estatus, p.usuario_id, p.categoria_id,
              u.nickname AS autor, c.nombre_categoria AS categoria
       FROM posts p
       LEFT JOIN usuarios u ON p.usuario_id = u.id
       LEFT JOIN categorias c ON p.categoria_id = c.id
       ORDER BY p.fecha_publicacion DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

// Obtener post por id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener post' });
  }
});

// Crear post
router.post('/', async (req, res) => {
  try {
    const { titulo, contenido, usuario_id, categoria_id, estatus } = req.body;
    const [result] = await db.query('INSERT INTO posts (titulo, contenido, usuario_id, categoria_id, estatus, fecha_publicacion) VALUES (?, ?, ?, ?, ?, NOW())', [titulo, contenido, usuario_id, categoria_id, estatus || 'activo']);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Actualizar post
router.put('/:id', async (req, res) => {
  try {
    const { titulo, contenido, usuario_id, categoria_id, estatus } = req.body;
    await db.query('UPDATE posts SET titulo=?, contenido=?, usuario_id=?, categoria_id=?, estatus=? WHERE id=?', [titulo, contenido, usuario_id, categoria_id, estatus, req.params.id]);
    res.json({ message: 'Post actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar post' });
  }
});

// Eliminar post
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar post' });
  }
});

module.exports = router;
