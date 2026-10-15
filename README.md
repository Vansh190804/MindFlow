# MindFlow - AI-Powered Knowledge Management

Save, organize, and discover your digital content with the power of AI

## Overview

MindFlow is an intelligent bookmark and note-taking application inspired by MyMind. It helps you capture content from anywhere, automatically organizes it using AI, and makes everything searchable and discoverable.

### Key Features

- **AI-Powered Organization** - Gemini AI automatically tags and categorizes your content
- **Smart Search** - Find anything with semantic search powered by vector embeddings
- **Beautiful Spaces** - Organize items into themed collections with custom colors
- **Browser Extension** - Capture content from any webpage with a right-click
- **Fully Responsive UI** - Mobile-first dashboard with adaptive layouts and navigation
- **Secure OAuth** - Sign in with Google for seamless authentication


### Browser Extension Setup

```sh
# Open Chrome/Edge
# Go to chrome://extensions/
# Enable Developer Mode
# Click "Load unpacked"
# Select the Extension folder
```

##  Project Structure

```
MindFlow/
├── src/                    # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components (Dashboard, Spaces, etc.)
│   ├── lib/              # API helpers and utilities
│   └── hooks/            # Custom React hooks
├── Backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration and security
│   │   ├── modals/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── Extension/        # Browser extension source
│   │   ├── manifest.json # Extension configuration
│   │   ├── background.js # Service worker
│   │   ├── content-script.js # Page detection
│   │   └── popup/        # Extension popup UI
│   └── alembic/          # Database migrations
└── public/               # Static assets
```

##  Features

### Responsive Experience

- Adaptive dashboard shell with a collapsible mobile navigation sheet and persistent desktop sidebar.
- Responsive grids, cards, and masonry layouts that scale from single-column mobile views to wide-screen dashboards.
- Space detail hero, action buttons, and tabs that stack gracefully on phones while keeping quick actions within reach.
- Full-screen search and filter surfaces tuned for touch input with accessible hit areas across breakpoints.

### Content Types
-  **Notes** - Text snippets and thoughts
-  **Links** - Bookmarks with automatic metadata
-  **Images** - Visual content with AI descriptions
-  **Videos** - Video links with thumbnails
-  **Article** - documentations in pdf format

### AI Capabilities
- Auto-tagging with Gemini AI
- Semantic search with embeddings
- Smart categorization
- Content summarization
- Image description generation

### Organization
- **Spaces** - Themed collections with custom colors
- **Folders** - Hierarchical organization
- **Tags** - Flexible categorization
- **Search** - Full-text and semantic search

### Browser Extension
- Right-click to save any content
- Automatic page metadata capture
- Instant sync with dashboard
- Desktop notifications
- Secure OAuth authentication

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Alembic** - Migrations
- **Supabase** - File storage

### AI/ML
- **Google Gemini AI** - Tagging and descriptions
- **Text Embedding 004** - Semantic search
- **DBSCAN** - Clustering algorithm

### Extension
- **Manifest V3** - Chrome extension platform
- **Service Worker** - Background processing
- **Chrome APIs** - Context menus, storage, notifications

##  Security

- OAuth 2.0 authentication
- JWT token-based API access
- Secure password hashing
- CORS protection
- Environment variable configuration
- Chrome extension isolated storage

## Testing

### Backend

Backend tests and linting run automatically through GitHub Actions whenever code is pushed to main or a pull request targets main.

- **Pytest**: Runs backend tests to validate functionality.
- **Ruff**: Checks Python code for linting issues.
- **Docker Build**: Verifies that the backend Docker image can be built successfully.

### To run checks locally:

```sh
cd Backend
pytest tests
ruff check app tests --ignore E712,F401,F541,F811,F841
docker build -t mindflow-backend .
```

### Frontend

```sh
npm run test
```

## CI/CD & Deployment

MindFlow uses **GitHub Actions, Docker, GitHub Container Registry (GHCR), and Render** to automate backend testing, container image publishing, and production deployment.

### Automated CI/CD Pipeline

Every push to `main` triggers the following workflow:

1. **Checkout:** GitHub Actions checks out the repository.
2. **Testing:** Runs backend tests using Pytest.
3. **Linting:** Runs Ruff to check Python code quality.
4. **Docker Build Validation:** Builds the backend Docker image to verify that the Docker configuration and image build succeed.
5. **Image Publishing:** After the CI job succeeds, GitHub Actions builds the backend image and pushes it to GitHub Container Registry (GHCR).
6. **Automatic Deployment:** GitHub Actions calls the Render deploy hook, triggering the deployment of the newly published image.

Pull requests targeting `main` run the validation pipeline without publishing a new image or triggering a deployment.

### Backend Deployment

The FastAPI backend is deployed on **Render** using a prebuilt Docker image stored in **GitHub Container Registry (GHCR)**.

- **Docker:** Packages the backend application and its dependencies into a portable container image.
- **GitHub Container Registry (GHCR):** Hosts the published backend image, which Render pulls during deployment.
- **Render:** Runs the containerized backend and provides the deployed service URL.
- **GitHub Actions:** Automates testing, linting, image building, publishing, and deployment triggering.
- **Environment Variables:** Production configuration, database credentials, and API secrets are managed through the deployment environment and GitHub Actions secrets.

When code is pushed to `main`, the workflow validates the backend before publishing a new image. Once the image is successfully pushed to GHCR, the workflow triggers Render through a deploy hook. Render then pulls the updated image and deploys it. This ensures that failed CI checks prevent the publishing and deployment stages from running.

### Frontend Deployment

The frontend is deployed separately from the backend. Its production API configuration points to the deployed Render backend URL, allowing the frontend to communicate with the live API.


