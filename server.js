const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const contactos = response.data;

    res.json(contactos);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    res.status(500).json({ mensaje: 'Hubo un error al obtener los contactos' });
  }
});

app.post('/contactos', async (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ mensaje: 'El nombre, apellido y teléfono son requeridos' });
  }

  console.log('Enviando contacto en JSON:', JSON.stringify({ nombre, apellido, telefono }));

  try {
    const response = await axios.post('http://www.raydelto.org/agenda.php', {
      nombre,
      apellido,
      telefono
    });

    console.log('Respuesta del servidor:', response.data);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    res.status(500).json({ mensaje: 'Hubo un error al almacenar el contacto' });
  }
});

app.listen(port, () => {
  console.log(`Servicio web corriendo en http://localhost:${port}`);
});
