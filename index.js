const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do parsowania JSON
app.use(express.json());

// Middleware CORS dla łatwiejszego testowania
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Tablica elementów w pamięci
let items = [
  { id: 1, name: "bułka", description: "z makiem" },
  { id: 2, name: "parówka", description: "mięso 90%"}
];

// Funkcja do generowania nowego ID
function getNextId() {
  if (items.length === 0) {
    return 1;
  }
  return Math.max(...items.map(item => item.id)) + 1;
}

// GET /health - status API i aktualny czas
app.get('/health', (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// GET /items - zwraca listę elementów
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - dodaje nowy element
app.post('/items', (req, res) => {
  const { name, description } = req.body;

  // Walidacja
  if (!name || !description) {
    return res.status(400).json({
      error: "Pola 'name' i 'description' są wymagane"
    });
  }

  // Tworzenie nowego elementu
  const newItem = {
    id: getNextId(),
    name: name,
    description: description
  };

  // Dodanie do tablicy
  items.push(newItem);

  // Zwrócenie utworzonego elementu
  res.status(201).json(newItem);
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Items: http://localhost:${PORT}/items`);
});

