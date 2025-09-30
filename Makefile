# VR-StarterKonto Makefile für Container Management

.PHONY: help build run stop clean dev test docker-build docker-run docker-push

# Konfiguration
REGISTRY := ghcr.io
REPO := $(shell git remote get-url origin | sed 's/.*github.com[:/]\(.*\).git/\1/' | tr A-Z a-z)
IMAGE := $(REGISTRY)/$(REPO)
TAG := $(shell git rev-parse --short HEAD)

help: ## Zeige verfügbare Kommandos
	@echo "VR-StarterKonto Container Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Baue den Production Container
	docker build -t $(IMAGE):$(TAG) -t $(IMAGE):latest .

run: ## Starte den Production Container
	docker run -d --name vr-starterkonto -p 80:80 -p 3001:3001 $(IMAGE):latest

stop: ## Stoppe den Container
	docker stop vr-starterkonto || true
	docker rm vr-starterkonto || true

clean: ## Entferne Container und Images
	docker stop vr-starterkonto || true
	docker rm vr-starterkonto || true
	docker rmi $(IMAGE):latest || true
	docker rmi $(IMAGE):$(TAG) || true

dev: ## Starte Development Environment
	docker-compose --profile dev up --build

dev-stop: ## Stoppe Development Environment
	docker-compose --profile dev down

test: ## Führe Tests aus
	cd backend && npm test
	cd frontend && npm test -- --watchAll=false

install: ## Installiere Dependencies
	cd backend && npm install
	cd frontend && npm install

docker-build: ## Baue Multi-Platform Images
	docker buildx build --platform linux/amd64,linux/arm64 -t $(IMAGE):$(TAG) -t $(IMAGE):latest .

docker-push: docker-build ## Pushe Images zur Registry
	docker push $(IMAGE):$(TAG)
	docker push $(IMAGE):latest

docker-run-ghcr: ## Starte Container von GHCR
	docker run -d --name vr-starterkonto -p 80:80 $(IMAGE):latest

logs: ## Zeige Container Logs
	docker logs -f vr-starterkonto

health: ## Prüfe Container Health
	curl -f http://localhost/health
	curl -f http://localhost/api/health

quick-test: build run ## Schneller Build und Test
	sleep 10
	make health
	make stop

monitoring: ## Starte mit Monitoring Stack
	docker-compose --profile monitoring up -d

full-stack: ## Starte kompletten Stack (DB, Cache, Monitoring)
	docker-compose --profile dev --profile database --profile cache --profile monitoring up -d

backup: ## Backup der Volumes
	docker run --rm -v vr-starterkonto_postgres_data:/data -v $(PWD):/backup alpine tar czf /backup/postgres-backup.tar.gz /data

restore: ## Restore der Volumes
	docker run --rm -v vr-starterkonto_postgres_data:/data -v $(PWD):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /

status: ## Zeige Status aller Services
	@echo "=== Container Status ==="
	docker ps -a --filter "name=vr-starterkonto"
	@echo ""
	@echo "=== Health Checks ==="
	@curl -s http://localhost/health || echo "Frontend nicht erreichbar"
	@curl -s http://localhost/api/health || echo "Backend nicht erreichbar"

# Git Hooks
pre-commit: test ## Führe Tests vor Commit aus
	@echo "✅ Tests erfolgreich"

# CI/CD Helpers
ci-build: ## Build für CI/CD
	docker buildx create --use || true
	docker buildx build --platform linux/amd64,linux/arm64 --push -t $(IMAGE):$(TAG) -t $(IMAGE):latest .

ci-test: ## Test für CI/CD
	docker run --rm -p 8080:80 -d --name ci-test $(IMAGE):latest
	sleep 15
	curl -f http://localhost:8080/health
	curl -f http://localhost:8080/api/health
	docker stop ci-test