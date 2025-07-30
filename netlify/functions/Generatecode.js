// /netlify/functions/generateCode.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const dataPath = path.join(__dirname, '../../data/codes.json');
  const { name, phone } = JSON.parse(event.body);
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expires = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 días

  let codes = [];
  if (fs.existsSync(dataPath)) {
    codes = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  codes.push({ name, phone, code, expires });
  fs.writeFileSync(dataPath, JSON.stringify(codes));

  return {
    statusCode: 200,
    body: JSON.stringify({ code })
  };
};

