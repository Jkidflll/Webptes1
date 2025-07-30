const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const dataPath = path.resolve(__dirname, 'codes.json');

  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath);
      const codes = JSON.parse(data);
      return {
        statusCode: 200,
        body: JSON.stringify(codes),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al leer los datos." }),
    };
  }
};
