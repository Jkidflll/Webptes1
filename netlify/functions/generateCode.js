const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const dataPath = path.resolve(__dirname, 'codes.json');
  const { name, phone } = JSON.parse(event.body || '{}');

  if (!name || !phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Nombre y teléfono son requeridos." }),
    };
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 días

  let codes = [];
  try {
    if (fs.existsSync(dataPath)) {
      codes = JSON.parse(fs.readFileSync(dataPath));
    }
  } catch (err) {
    console.error("Error leyendo archivo:", err);
  }

  codes.push({ name, phone, code, expiresAt });

  try {
    fs.writeFileSync(dataPath, JSON.stringify(codes, null, 2));
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo guardar el código." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ code }),
  };
};


