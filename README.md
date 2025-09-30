# VR-StarterKonto Gesundheit & Struktur - Web-App

Eine interaktive Web-Anwendung zur Demonstration der Features des VR-StarterKonto für junge Erwachsene am Berufseinstieg.

## Features

- 📊 **Konto-Dashboard**: Kontostand, Transaktionen, Health-Bonus Punkte
- 🎯 **Bonusmechanik**: Punkte für Vorsorge-Checks und Versicherungsabschlüsse
- 📱 **Responsives Design**: Mobile-optimiert mit moderner UI
- ⚡ **Real-time Updates**: Sofortige Dashboard-Aktualisierung

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Datenspeicherung**: In-Memory (Mock-Daten)

## Projektstruktur

```
vr-starterkonto-app/
├── backend/          # Node.js/Express API
├── frontend/         # React Anwendung
└── README.md
```

## 🚀 Schnellstart

### Option 1: Docker Container (Empfohlen)
```bash
# Production Container starten
make build && make run
# oder direkt:
docker run -p 80:80 ghcr.io/DEIN-USERNAME/vr-starterkonto-app:latest

# Zugriff auf http://localhost
```

### Option 2: Development Mode
```bash
# Development Environment
make dev
# oder:
docker-compose --profile dev up

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### Option 3: Lokal ohne Docker
```bash
# Backend starten
cd backend && npm install && npm start

# Frontend starten (neues Terminal)
cd frontend && npm install && npm start
```

## 🐳 Container Features

- **Multi-Platform**: Läuft auf AMD64 und ARM64 (Apple Silicon)
- **Multi-Process**: Nginx + Node.js Backend in einem Container
- **Health Checks**: Automatische Überwachung
- **Security Scanning**: Trivy Integration
- **CI/CD Ready**: GitHub Actions für automatischen Build

## 📦 GitHub Container Registry

Das Image wird automatisch in der GitHub Container Registry (GHCR) bereitgestellt:

```bash
# Aktuelles Image pullen
docker pull ghcr.io/DEIN-USERNAME/vr-starterkonto-app:latest

# Starten
docker run -d -p 80:80 --name vr-starterkonto ghcr.io/DEIN-USERNAME/vr-starterkonto-app:latest
```

### Verfügbare Tags:
- `latest` - Neueste stabile Version (main branch)
- `develop` - Development Version
- `v1.0.0` - Semantic Versioning
- `sha-abc123` - Spezifische Commits

## 🛠 Entwicklung

### Make Commands
```bash
make help           # Alle verfügbaren Kommandos
make build          # Container bauen
make run            # Container starten
make dev            # Development Mode
make test           # Tests ausführen
make clean          # Container entfernen
```

### Docker Compose Profiles
```bash
# Nur Hauptanwendung
docker-compose up

# Mit Development Services
docker-compose --profile dev up

# Mit Datenbank
docker-compose --profile database up

# Kompletter Stack (inkl. Monitoring)
docker-compose --profile dev --profile database --profile monitoring up
```

## Value Proposition

"Mit deinem Berufseinstieg starten auch deine Finanzen – gesund, sicher & strukturiert."