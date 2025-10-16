# Restaurant Management Backend

Ovoj projekt pretstavuva backend za sistem koj e odgovoren za operaciite vo restorani, vklucuvajki kreiranje i menadzment na naracki, produkti, sostojki, tabeli i konobarite.

## Tehnologii

- **Node.js** – runtime za server-side JavaScript
- **TypeScript** – staticki tipiziran JavaScript
- **Express.js** – web framework za REST API
- **Sequelize** – ORM za komunikacija so MySQL baza
- **MySQL** – relaciska baza za cuvanje na podatoci
- **npm** – package manager

## Struktura

- `models/` – definicii na modeli i nivnite asocijacii
- `services/` – logika za manipuliranje so podatoci (CRUD)
- `controllers/` – REST API endpoints
- `db/` – konfiguracija na baza i konekcija
- `enums/` – enumeracii za statusi i tipovi
- `types/` – interfejsi i tipovi za TypeScript

## Funkcionalnosti

- Kreiranje, citanje, azuriranje i brisenje na **products**, **orders**, **order products**, **waiters** i **serving tables**
- Validacija i biznis logika (na primer, order ne moze da se kreira bez list of products i waiter)
- Povlekuvanje na kompleten order so list of products, waiter i serving table preko asocijacii
- Poddrshka za UUID identifikacija i timestamps
