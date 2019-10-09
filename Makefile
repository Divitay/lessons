up: run db.latest db.seed fg

down:
	docker-compose down --remove-orphans

restart:
	docker-compose restart

test:
	docker-compose exec api npm run lint
	docker-compose exec api npm run test

db.rollback:
	docker-compose exec api npm run migrate-rollback

db.latest:
	docker-compose exec api npm run migrate-latest

db.migration:
	docker-compose exec api npm run migrate-make $(name)

db.seed:
	docker-compose exec api npm run seed

run:
	docker-compose up --build -d

fg:
	docker-compose logs --follow
