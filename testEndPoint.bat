curl -X POST http://localhost:5000/api/auth/signin ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"eshan@example.com\", \"password\":\"123456\"}"