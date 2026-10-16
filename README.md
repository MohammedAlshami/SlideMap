# SlideMap — Landslide Susceptibility & Incident Mapping

SlideMap is a **UMHackathon** project that helps teams visually explore landslide-prone
areas and incident reports: draw polygons over a map, query spatial data, and
summarize findings with an OpenAI-powered assistant.

## Features

- 🗺️ Interactive Mapbox map with polygon/slide-shape drawing (`react-leaflet-draw`)
- 📍 News & incident extraction via raster scanning and coordinate matching
- 🔎 Geocoding, reverse lookup, and OSM-based search
- 🔐 Firebase Auth for report sharing and access control
- 💬 AI assistant (OpenAI) for querying a landslide-dataset
- 📊 Charts & reports in the Next.js UI

## Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind, DaisyUI, MUI
- **Backend:** Python (Flask-based geo + OpenAI + Firebase services), Selenium scraping, Pillow/Tiff for satellite raster handling
- **Geo / data:** Mapbox, Leaflet, GeoJSON, OSINT scraping tools

## Getting started

### Frontend

```bash
npm install
npm run dev   # http://localhost:3000
```

Create `.env.local`:

```ini
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DB_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Backend

```bash
cd Backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py   # http://127.0.0.1:5000
```

```ini
OPENAI_API_KEY=
MAPBOX_TOKEN=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DB_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

## Project layout

```
Backend/            # Flask + scraping + geo processing services
Server/             # firebase helpers (db/upload)
Frontend_new/my-app # Next.js app
Search_notebook.ipynb
landslide_data.json
```

## License

MIT (or your choice). Replace/credit data sources where applicable.
