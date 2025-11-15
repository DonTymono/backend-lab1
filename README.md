# Backend API - Laboratorium 1

**Autor:** Tymon
**Grupa:**  INMN2(hybryda)_PAW2

## Opis projektu
Proste REST API stworzone na zajęciach z backend development.

## Technologie
-   Node.js
- Express.js

## Endpointy
1. GET /health - status API i aktualny czas
2. GET /items - pobranie listy elementów
3. POST /items - dodanie nowego elementu

## Uruchomienie
```bash
npm start
```

Serwer uruchomi się na porcie 3000 (domyślnie) lub na porcie zdefiniowanym w zmiennej środowiskowej PORT.

## Testowanie endpointów

### GET /health

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/health -Method Get
```

**curl:**
```bash
curl http://localhost:3000/health
```

**Odpowiedź:**
```json
{
  "status": "OK",
  "timestamp": "2024-11-15T10:30:00.000Z"
}
```

### GET /items

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:3000/items -Method Get
```

**curl:**
```bash
curl http://localhost:3000/items
```

**Odpowiedź:**
```json
[
  { "id": 1, "name": "bułka", "description": "z makiem" },
  { "id": 2, "name": "parówka", "description": "mięso 90%" }
]
```

### POST /items

**PowerShell:**
```powershell
$body = @{
    name = "Nowy element"
    description = "Nowy opis"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/items -Method Post -Body $body -ContentType "application/json"
```

**curl:**
```bash
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d "{\"name\":\"Nowy element\",\"description\":\"Nowy opis\"}"
```

**Request body:**
```json
{
  "name": "Nowy element",
  "description": "Nowy opis"
}
```

**Odpowiedź:**
```json
{
  "id": 3,
  "name": "Nowy element",
  "description": "Nowy opis"
}
```

### Postman

1. **GET /health**
   - Method: `GET`
   - URL: `http://localhost:3000/health`

2. **GET /items**
   - Method: `GET`
   - URL: `http://localhost:3000/items`

3. **POST /items**
   - Method: `POST`
   - URL: `http://localhost:3000/items`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Nowy element",
       "description": "Nowy opis"
     }
     ```
