# Logistics Management System

## Übersicht

Das **Logistics Management System** ist eine zentralisierte Webanwendung, die verschiedene Aspekte des Betriebs eines Logistikunternehmens verwaltet. Dazu gehören das **Mitarbeiter-Management**, das **Fahrzeug-Management** und die **Dokumentenablage**. Die Anwendung integriert diese Funktionen in einer Plattform mit dem Ziel, **Datenredundanz** durch ein einheitliches Datenbanksystem zu reduzieren.

Das Frontend der Anwendung wurde mit **React** unter Verwendung von **Vite** entwickelt, um eine optimale Build-Optimierung und schnellere Entwicklungszyklen zu ermöglichen. **Supabase** wird als Backend verwendet, um Authentifizierung, Datenbankverwaltung und Dateispeicherung zu verwalten.

## Funktionen

- **Mitarbeiter-Management**: Ermöglicht die Verwaltung von Mitarbeiterdaten, einschließlich Rollen, Anwesenheit und Leistungskennzahlen.
- **Fahrzeug-Management**: Erleichtert die Verfolgung und Verwaltung der Fahrzeugflotte des Unternehmens, einschließlich Wartungsplänen, Nutzungsprotokollen und Kraftstoffverbrauch.
- **Dokumentenablage**: Ein dedizierter Bereich zum Hochladen, Organisieren und Verwalten von unternehmensbezogenen Dokumenten und Ordnern.
- **Datenintegrität**: Das System ist so aufgebaut, dass Datenredundanz vermieden wird, indem alle Informationen in einer einzigen Datenbank zentralisiert werden.
- **Benutzerauthentifizierung**: Sichere Benutzerzugänge und rollenbasierte Berechtigungen, die über den Authentifizierungsdienst von Supabase verwaltet werden.

## Verwendete Technologien

### Frontend

- **React**
- **Vite**

### Backend

- **Supabase**
  - **PostgreSQL**
  - **Supabase Auth**
  - **Supabase Storage**
  - **Row Level Security**

## Installation

Um das Projekt zu starten, befolgen Sie die folgenden Schritte:

### Voraussetzungen

- **NPM** oder **Yarn** als Paketmanager
- **Supabase-Konto** mit einem konfigurierten Projekt

### Installationsanweisungen

1. **Repository klonen**:
    ```bash
    git clone https://github.com/your-username/logistics-management-system.git
    ```

2. **In das Projektverzeichnis wechseln**:
    ```bash
    cd logistics-management-system
    ```

3. **Abhängigkeiten installieren**:
    Mit NPM:
    ```bash
    npm install
    ```
    Oder mit Yarn:
    ```bash
    yarn install
    ```

4. **Erstellen Sie eine `.env`-Datei**, um Ihre Supabase-Zugangsdaten zu speichern:
    ```bash
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

5. **Entwicklungsserver starten**:
    ```bash
    npm run dev
    ```
    oder
    ```bash
    yarn dev
    ```

6. Öffnen Sie Ihren Browser und besuchen Sie `http://localhost:3000`, um auf die Anwendung zuzugreifen.
