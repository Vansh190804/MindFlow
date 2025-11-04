# MindFlow - AI-Powered Knowledge Management

> Save, organize, and discover your digital content with the power of AI

## 🌟 Overview

MindFlow is an intelligent bookmark and note-taking application inspired by MyMind. It helps you capture content from anywhere, automatically organizes it using AI, and makes everything searchable and discoverable.

### Key Features

- 🤖 **AI-Powered Organization** - Gemini AI automatically tags and categorizes your content
- 🔍 **Smart Search** - Find anything with semantic search powered by vector embeddings
- 🎨 **Beautiful Spaces** - Organize items into themed collections with custom colors
- 🌐 **Browser Extension** - Capture content from any webpage with a right-click
- 📱 **Fully Responsive UI** - Mobile-first dashboard with adaptive layouts and navigation
- 🔐 **Secure OAuth** - Sign in with Google for seamless authentication

## 🚀 Quick Start

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?


### Prerequisites

- Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Python 3.8+ (for backend)
- PostgreSQL database
- Supabase account (for file storage)
- Google OAuth credentials

### Frontend Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd MindFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```sh
# Navigate to backend
cd Backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload
```

### Browser Extension Setup

```sh
# Open Chrome/Edge
# Go to chrome://extensions/
# Enable Developer Mode
# Click "Load unpacked"
# Select the Extension folder
```

See [EXTENSION_SETUP.md](EXTENSION_SETUP.md) for detailed instructions.

## 📚 Documentation

- [Extension Setup Guide](EXTENSION_SETUP.md) - Complete browser extension installation
- [Extension Testing](EXTENSION_TESTING.md) - Comprehensive testing checklist
- [Authentication Setup](AUTHENTICATION_SETUP.md) - OAuth configuration
- [Image/Video Upload](IMAGE_VIDEO_UPLOAD_SETUP.md) - Supabase storage setup
- [Intelligent Spaces](INTELLIGENT_SPACES.md) - AI-powered organization
- [Supabase DB Setup](Backend/SUPABASE_DB_SETUP.md) - Configure the shared PostgreSQL database
- [SMTP Setup](Backend/SMTP_SETUP.md) - Configure email delivery providers
- [Testing Guide](TESTING_GUIDE.md) - Backend testing instructions

## 🏗️ Project Structure

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

## 🎯 Features

### Responsive Experience

- Adaptive dashboard shell with a collapsible mobile navigation sheet and persistent desktop sidebar.
- Responsive grids, cards, and masonry layouts that scale from single-column mobile views to wide-screen dashboards.
- Space detail hero, action buttons, and tabs that stack gracefully on phones while keeping quick actions within reach.
- Full-screen search and filter surfaces tuned for touch input with accessible hit areas across breakpoints.

### Content Types
- 📝 **Notes** - Text snippets and thoughts
- 🔗 **Links** - Bookmarks with automatic metadata
- 🖼️ **Images** - Visual content with AI descriptions
- 🎥 **Videos** - Video links with thumbnails
- 💬 **Article** - documentations in pdf format

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

## 🔐 Security

- OAuth 2.0 authentication
- JWT token-based API access
- Secure password hashing
- CORS protection
- Environment variable configuration
- Chrome extension isolated storage

## 🧪 Testing

```sh
# Frontend tests
npm run test

# Backend tests
cd Backend
pytest

# Extension testing
# See EXTENSION_TESTING.md for checklist
```

## 📦 Deployment

### Frontend
- Deploy to Vercel, Netlify, or any static host
- Update API URLs for production

### Backend
- Deploy to Railway, Render, or AWS
- Set up production database
- Configure environment variables
- Enable HTTPS

### Extension
- Create proper icons
- Update URLs to production
- Zip Extension folder
- Publish to Chrome Web Store (optional)

