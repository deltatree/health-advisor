# GitHub Actions Workflows

Dieses Repository enthält zwei GitHub Actions Workflows für CI/CD:

## 🔒 docker-build-push.yml (Vollversion)

**Features:**
- Vollständige Sicherheitsscans mit Trivy
- SARIF Upload zu GitHub Security Tab
- Erweiterte Container-Tests
- Multi-Platform Builds

**Voraussetzungen:**
- GitHub Advanced Security aktiviert (für private Repos)
- `security-events: write` Berechtigung
- Repository Settings → Security → Code scanning alerts aktiviert

**Verwendung:**
Automatisch bei Push/PR auf `main` Branch aktiviert.

## 🚀 docker-build-basic.yml (Basisversion)

**Features:**
- Basis-Sicherheitschecks ohne externe Tools
- Container Build & Push zu GHCR
- Integration Tests
- Funktioniert ohne spezielle Berechtigungen

**Voraussetzungen:**
- Nur Standard GitHub Actions Berechtigungen
- Funktioniert in allen Repository-Typen

**Verwendung:**
Kann als Fallback verwendet werden, wenn der vollständige Workflow Berechtigungsprobleme hat.

## 🔧 Konfiguration

### Repository Secrets
Keine Secrets erforderlich - verwendet `GITHUB_TOKEN` automatisch.

### Berechtigungen

Für `docker-build-push.yml`:
```yaml
permissions:
  contents: read
  packages: write
  security-events: write  # Für SARIF Upload
  pull-requests: write    # Für PR Kommentare
```

Für `docker-build-basic.yml`:
```yaml
permissions:
  contents: read
  packages: write
  pull-requests: write
```

### Repository Settings

1. **Packages (GHCR) aktivieren:**
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

2. **Security Features (für Vollversion):**
   - Settings → Security → Code security and analysis
   - "Code scanning alerts" aktivieren

## 🐳 Image Registry

Die gebauten Images werden automatisch gepusht zu:
`ghcr.io/USERNAME/REPOSITORY-NAME`

**Verfügbare Tags:**
- `latest` (main branch)
- `develop` (develop branch) 
- `pr-123` (Pull Requests)
- `v1.0.0` (Semantic Version Tags)
- `sha-abc123` (Commit SHA)

## 🚀 Verwendung der Images

```bash
# Aktuellste Version
docker run -p 80:80 ghcr.io/USERNAME/vr-starterkonto-app:latest

# Spezifische Version
docker run -p 80:80 ghcr.io/USERNAME/vr-starterkonto-app:v1.0.0

# Mit docker-compose
docker-compose up
```

## 🛠 Lokale Entwicklung

```bash
# Makefile verwenden
make build
make run

# Oder manuell
docker build -t vr-starterkonto .
docker run -p 80:80 vr-starterkonto
```

## ⚠️ Fehlerbehebung

**"Resource not accessible by integration" Fehler:**
1. Repository → Settings → Actions → General
2. Workflow permissions auf "Read and write permissions" setzen
3. Oder `docker-build-basic.yml` verwenden

**SARIF Upload Fehler:**
1. GitHub Advanced Security aktivieren (kostenpflichtig für private Repos)
2. Settings → Security → Code scanning aktivieren
3. Oder `continue-on-error: true` verwenden (bereits konfiguriert)

**Package Push Fehler:**
1. Packages Berechtigung prüfen
2. Registry Login testen
3. Package Visibility in Repository Settings prüfen