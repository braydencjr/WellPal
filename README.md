# 🌿 WellPal: click!

> **A mental wellness companion app for university students**  
> Transforming mental health support through innovative digital solutions

<div align="center">
  <img src="frontend/public/assets/logo.JPG" alt="WellPal: click! Logo" width="200" />
  <br />
  <br />
</div>

---

## 🏃🏻‍♀️Track
Track 1 - Student Lifestyle

## 🚨 Problem Statement
## 🍀 Mental Health Support For Students
Many students avoid seeking help due to limited counseling resources or the fear of stigma. There is a pressing need for tools that encourage self-care, provide mental health support, and help students cope with the challenges of university life.


## ✨ Features

WellPal: click! offers a comprehensive suite of mental wellness tools designed specifically for university students:

### 🎨 Digital Mood Postcards
Transform your daily mood tracking into meaningful digital postcards. Express yourself through colorful designs that capture your emotional journey and create a visual diary of your wellbeing.

### 🧘‍♀️ Relax Hub
Find stress relief through various activities:
- **Games**: 15 Puzzle, Snake Game, Tetris, and custom games
- **Exercises**: Deep breathing and progressive muscle relaxation
- **ASMR**: Curated audio experiences for deep relaxation
- **Music**: Calming playlists to help you unwind

### 🎵 Smart Music Suggestions
Receive personalized music playlists based on your daily mood. Our AI analyzes your emotional patterns to recommend the perfect soundtrack for your current state of mind.

### 🐶 AI Mental Companion
Meet WellPal, your 24/7 AI-powered supportive chat friend. Have meaningful conversations, get emotional support, and receive guidance whenever you need it.

### 🆘 Emergency Support
Quick access to saved emergency contacts and mental health hotlines. One-tap connection to crisis resources when you need immediate support.

### 🎭 Personalized Experience
Customize theme colors and font sizes to match your preferences and support accessibility needs.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 18) with TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Animation**: Framer Motion
- **State Management**: React Context API, Custom Hooks
- **Data Visualization**: Recharts for mood analytics
- **Forms**: React Hook Form with Zod validation

### Backend
- **API Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with Python-JOSE and Passlib
- **Data Validation**: Pydantic 2.5.0

### AI & ML
- **Core**: Google Generative AI (Gemini)
- **Framework**: LangChain for context-aware AI responses
- **Personalization**: Custom recommendation algorithms

### DevOps & Tooling
- **PWA Support**: Service workers for offline functionality
- **Testing**: React Testing Library, Pytest
- **Code Quality**: TypeScript, ESLint, Prettier, Black
- **Deployment**: Docker containerization

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.11+
- PostgreSQL (or SQLite for development)
- Google Generative AI API key

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/WellPal-new.git
cd WellPal-new

# Install frontend dependencies
cd frontend
npm install
# or
yarn install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your database and API credentials
```

### Running the Application
```bash
# Start backend (from backend directory)
.venv\Scripts\activate
python run.py

# In another terminal, start frontend (from frontend directory)
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to access WellPal!

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/wellpal
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key
```

---

## 👨‍💻 Team Cache Me If U Can
- Brayden Chong Jie Rui
- Chin Yiu Ern
- Chua Yu Jien
- Ong Yi Hao

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/braydencjr/WellPal/tree/main?tab=MIT-1-ov-file#readme) file for details.

---

<div align="center">
  <p>Made with care for student mental wellness</p>
  <p>© Team Cache Me If U Can</p>
</div>
