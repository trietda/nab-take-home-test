# NAB Take Home Test
This is a monorepo for NAB take home test

## Requirement
- NodeJS: `^14.16.0`
- MySQL: `5.7`
- RabbitMQ: `3.8.11`
- (Optional) Docker

## How to start

1. Install dependencies. For each child repo, run:
```bash
npm install
```
2. Create database named `seed`
3. Run migrations. For each child repo, run:
```bash
npm run migration:run
```
4. (Optional) Run seed script in the MySQL
```sql
INSERT INTO `product` (`id`, `name`, `price`, `brand`, `color`) VALUES
('7fea44fc-2ad5-4bdd-9192-4996cac64045', 'Product A', '10', NULL, NULL),
('8e259e8a-d74b-477d-a896-1fe2a11025c1', 'Product B', '15', 'Brand X', 'white');
```
5. Add environemnt variables. For each child repo:
    1. Create `.env` file in each child repo root folder
    2. Copy `.env.sample` file in each corresponding child repo
    3. Make necessary changes
6. Start server. For each child repo, run:
```bash
npm run serve
```

## Installation
1. MySQL
- Docker:
```docker
docker run --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -p 3306:3306 -d mysql:5
```
- [Official installation guide](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html)
2. RabbitMQ
- Docker:
```docker
docker run -d -h local-rabbit --name rabbitmq -p 15672:15672 rabbitmq:3-management
```
- [Official download link](https://www.rabbitmq.com/download.html)

## Test
### Unit & integration test
For each child repo:
```bash
npm run test
```
### API test
```bash
npm run test:api
```

## Environment variables
Sample `.env` file included in each child repo

## API documents
### GET /api/v1/products
- Header:
    - x-user: user name
- Query:
    - (optional) search: search term
- CURL:
```bash
curl --header "x-user: Test User" http://localhost:3000/api/v1/products\?sear
ch\=searchterm
```
###
### GET /api/v1/products/:productId
- Path:
    - productId: product ID
- Header:
    - x-user: user name
- CURL:
```bash
curl --header "x-user: Test User" http://localhost:3000/api/v1/products/7fea44fc-2ad5-4bdd-9192-4996cac64045
```
