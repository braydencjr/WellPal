# WellPal - Complete Tech Stack Documentation

> **Mental wellness companion app for university students**  
> Transforming mental health support through innovative digital solutions

---

## 🏗️ **Architecture Overview**

WellPal follows a modern full-stack architecture with clear separation between frontend and backend services:

- **Frontend**: Next.js 15 (React 18) with TypeScript
- **Backend**: FastAPI (Python) with SQLAlchemy ORM
- **Database**: PostgreSQL with SQLite for development
- **AI Integration**: Google Generative AI (Gemini) via LangChain
- **Deployment**: Progressive Web App (PWA) capabilities

---

## 🎨 **Frontend Technology Stack**

### **Core Framework**
- **Next.js 15.2.4** - React framework with App Router, Server-Side Rendering, and API routes
- **React 18.3.1** - Component-based UI library with modern hooks and concurrent features
- **TypeScript 5.x** - Static typing for enhanced developer experience and code reliability

### **UI & Styling**
- **Tailwind CSS 4.1.9** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Comprehensive component library for accessible, unstyled components:
  - Dialog, Dropdown, Navigation, Toast, Tabs, and 20+ other components
- **Lucide React 0.454.0** - Beautiful, customizable SVG icons
- **Framer Motion 12.23.12** - Production-ready motion library for React animations
- **Class Variance Authority (CVA)** - Type-safe component variants
- **Tailwind Merge & Animate** - Enhanced Tailwind utilities

### **Forms & Validation**
- **React Hook Form 7.60.0** - Performant forms with minimal re-renders
- **Zod 3.25.67** - TypeScript-first schema validation
- **Hookform Resolvers** - Integration between React Hook Form and Zod

### **Data Visualization & Calendar**
- **Recharts 2.15.4** - Composable charting library for mood tracking analytics
- **React Big Calendar 1.19.4** - Calendar component for appointment scheduling
- **React Day Picker 9.8.0** - Flexible date picker component

### **Progressive Web App (PWA)**
- **Next PWA 5.6.0** - Service worker integration for offline functionality
- **Next Themes** - Theme switching capabilities for dark/light mode

### **State Management & Context**
- **React Context API** - Global state management for user data and preferences
- **Custom Hooks** - Reusable stateful logic for mobile detection, toast notifications

---

## ⚡ **Backend Technology Stack**

### **Core Framework**
- **FastAPI 0.104.1** - Modern, fast web framework for building APIs with Python
- **Uvicorn 0.24.0** - Lightning-fast ASGI server implementation
- **Python 3.11+** - Latest Python features and performance improvements

### **Database & ORM**
- **SQLAlchemy 2.0.23** - Python SQL toolkit and Object-Relational Mapping library
- **Alembic 1.12.1** - Database migration tool for SQLAlchemy
- **PostgreSQL** - Production database (via psycopg2-binary 2.9.9)
- **SQLite** - Development database for rapid prototyping

### **Authentication & Security**
- **Python-JOSE 3.3.0** - JWT token handling with cryptographic support
- **Passlib 1.7.4** - Password hashing library with bcrypt
- **Python-Multipart** - Form data parsing for file uploads

### **Data Validation**
- **Pydantic 2.5.0** - Data validation using Python type annotations
- **Pydantic Settings** - Environment configuration management

### **AI & Machine Learning**
- **LangChain 0.1.x** - Framework for developing applications with language models
- **LangChain Google GenAI** - Google Generative AI integration
- **Google Generative AI 0.3.0** - Direct Google AI API access
- **LangChain Core** - Core LangChain functionality

### **HTTP & Networking**
- **HTTPX 0.25.2** - Async HTTP client for external API calls
- **AIOHTTP 3.9.1** - Async HTTP client/server framework
- **CORS Middleware** - Cross-Origin Resource Sharing support

### **Development & Testing**
- **Pytest 7.4.3** - Testing framework with async support
- **Black 23.11.0** - Code formatter
- **isort 5.12.0** - Import sorting
- **Flake8 6.1.0** - Code linting

### **Production & Monitoring**
- **Gunicorn 21.2.0** - Python WSGI HTTP Server
- **Structlog 23.2.0** - Structured logging
- **Python-dotenv** - Environment variable management

---

## 🚀 **Feature-Specific Technology Implementation**

### **1. Integration of Postcard with Mood Tracking**
**Technologies Used:**
- **Frontend**: React Context for mood state, Recharts for mood analytics, Framer Motion for animations
- **Backend**: SQLAlchemy models for mood entries, FastAPI endpoints for CRUD operations
- **UI Components**: Custom postcard components with Radix UI primitives, CSS transformations
- **Data Flow**: React Hook Form → Zod validation → FastAPI → PostgreSQL

**Key Files:**
- `components/enhanced-postcard-modal.tsx`
- `components/mood-tracker.tsx`
- `components/mood-insights.tsx`

### **2. Relax Hub (Games, Exercises, ASMR, Music)**
**Technologies Used:**
- **Game Engine**: Pure TypeScript/React implementations
- **Audio Processing**: Web Audio API for ASMR and music playback
- **State Management**: React hooks for game states, progress tracking
- **UI**: Tailwind CSS for responsive game interfaces, Lucide icons

**Key Components:**
- `components/stress-relief-tabs.tsx`
- `components/snake-game.tsx`
- `components/tetris-game.tsx`
- `components/advanced-asmr-player.tsx`
- `components/progressive-muscle-relaxation.tsx`

### **3. Smart Music Suggestions**
**Technologies Used:**
- **AI Integration**: Google Generative AI for personalized recommendations
- **Data Processing**: LangChain for prompt engineering and response handling
- **Audio Playback**: HTML5 Audio API with custom controls
- **Personalization**: User mood data analysis via Recharts

**Implementation:**
- Backend AI service processes mood history
- LangChain creates contextual music prompts
- Frontend music player with custom controls

### **4. AI Mental Companion (WellPal Chat)**
**Technologies Used:**
- **AI Core**: Google Gemini via LangChain integration
- **Real-time Chat**: React state management with instant UI updates
- **Conversation Memory**: SQLAlchemy session storage
- **Safety**: Pydantic validation for input sanitization

**Key Features:**
- Context-aware responses based on user mood history
- Conversation persistence across sessions
- Emergency detection and response protocols

**Key Files:**
- `components/chat-interface.tsx`
- `components/dogpal-chat.tsx`
- `backend/app/services/ai_chat_service.py`

### **5. Emergency Support System**
**Technologies Used:**
- **Contact Management**: SQLAlchemy models for emergency contacts
- **Quick Access**: React components with one-tap calling
- **Integration**: Web APIs for phone calls and SMS
- **Accessibility**: ARIA labels and keyboard navigation

**Implementation:**
- Emergency contact CRUD via FastAPI
- Quick access buttons with tel: protocol
- Mental health hotline integration

---

## 📱 **Progressive Web App Features**

### **PWA Capabilities**
- **Service Worker**: Offline functionality for core features
- **App Manifest**: Native app-like installation
- **Push Notifications**: Reminder system for mood tracking
- **Background Sync**: Offline data synchronization

### **Mobile Optimization**
- **Responsive Design**: Tailwind breakpoints for all screen sizes
- **Touch Gestures**: Optimized for mobile interactions
- **Performance**: Next.js optimization for fast loading

---

## 🔧 **Development Tools & Workflow**

### **Code Quality**
- **TypeScript**: Static type checking across the entire frontend
- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting consistency
- **Black + isort**: Python code formatting and import organization

### **Build & Deployment**
- **Next.js Build**: Optimized production builds with SSG/SSR
- **Docker**: Containerization for consistent deployments
- **Environment Management**: Separate configs for dev/staging/production

### **Testing Strategy**
- **Frontend**: React Testing Library (ready for implementation)
- **Backend**: Pytest with async support and database fixtures
- **Integration**: API endpoint testing with FastAPI test client

---

## 🌐 **API Architecture**

### **RESTful Design**
- **FastAPI Router**: Modular API organization
- **OpenAPI/Swagger**: Automatic API documentation
- **Pydantic Models**: Request/response validation
- **CORS**: Cross-origin support for frontend integration

### **Database Design**
- **User Management**: Authentication and profile data
- **Mood Tracking**: Timestamped mood entries with analytics
- **Chat History**: Conversation persistence for AI companion
- **Emergency Contacts**: Secure contact storage

---

## 🚀 **Performance & Optimization**

### **Frontend Optimization**
- **Next.js 15**: Latest optimizations including Turbopack
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic component-level splitting
- **Tree Shaking**: Unused code elimination

### **Backend Optimization**
- **Async/Await**: Non-blocking I/O operations
- **Database Pooling**: Connection management via SQLAlchemy
- **Caching**: Strategic caching for AI responses
- **Rate Limiting**: API protection against abuse

---

## 🔐 **Security Implementation**

### **Authentication & Authorization**
- **JWT Tokens**: Secure user authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Pydantic + Zod for comprehensive validation
- **CORS Configuration**: Controlled cross-origin access

### **Data Protection**
- **Environment Variables**: Secure credential management
- **SQL Injection Prevention**: ORM-based queries
- **XSS Protection**: React's built-in XSS prevention
- **HTTPS Enforcement**: Production security headers

---

## 📊 **Monitoring & Analytics**

### **Logging & Debugging**
- **Structured Logging**: Structlog for backend logging
- **Error Boundaries**: React error handling
- **API Monitoring**: Request/response logging
- **Performance Tracking**: Core Web Vitals monitoring

---

## 🌟 **Innovation Highlights**

1. **AI-Powered Personalization**: LangChain + Google AI for contextual responses
2. **Mood-to-Music Intelligence**: AI-driven music recommendations based on emotional state
3. **Gamified Mental Health**: Custom games integrated with wellness tracking
4. **Digital Postcard Memories**: Unique approach to mood journaling
5. **Emergency Support Integration**: Seamless crisis intervention capabilities

---

## 📈 **Scalability & Future Roadmap**

### **Current Architecture Benefits**
- **Microservices Ready**: Separate frontend/backend for independent scaling
- **Database Flexibility**: SQLAlchemy supports multiple database backends
- **AI Model Agnostic**: LangChain allows easy AI provider switching
- **Component Reusability**: Radix UI provides consistent, accessible components

### **Planned Enhancements**
- **Real-time Features**: WebSocket integration for live chat
- **Mobile Apps**: React Native version using shared components
- **Advanced Analytics**: Machine learning for mood pattern analysis
- **Integrations**: Calendar apps, fitness trackers, and health platforms

---

**Built with ❤️ for student mental wellness**  
*Version 1.0.0 - September 2025*
