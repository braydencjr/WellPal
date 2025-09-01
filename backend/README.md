# WellPal Backend

Mental wellness companion API for university students built with FastAPI.

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/v1/              # API endpoints
│   │   ├── endpoints/       # Individual endpoint modules
│   │   └── api.py           # Main API router
│   ├── core/                # Core utilities
│   │   ├── config.py        # Configuration management
│   │   ├── database.py      # Database setup
│   │   └── security.py      # Authentication utilities
│   ├── schemas/             # Pydantic data models
│   ├── services/            # Business logic services
│   └── __init__.py
├── main.py                  # FastAPI application entry
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Set up Python environment
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Set up environment variables
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings
```

### 4. Run the development server
```bash
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `DELETE /api/v1/users/me` - Delete current user account

### Mood Tracking
- `GET /api/v1/mood/entries` - Get mood entries
- `POST /api/v1/mood/entries` - Create mood entry
- `GET /api/v1/mood/analytics` - Get mood analytics

### AI Chat
- `POST /api/v1/chat/message` - Send message to AI assistant
- `GET /api/v1/chat/history` - Get chat history
- `DELETE /api/v1/chat/history` - Clear chat history

### Support Resources
- `GET /api/v1/support/emergency-contacts` - Get emergency contacts
- `GET /api/v1/support/mental-health-resources` - Get mental health resources
- `GET /api/v1/support/counseling-services` - Get counseling services

## 🗄️ Database

Currently configured to use SQLite for development. To use PostgreSQL in production:

1. Install PostgreSQL
2. Update `DATABASE_URL` in your `.env` file:
   ```
   DATABASE_URL=postgresql://username:password@localhost/wellpal
   ```
3. Install psycopg2: `pip install psycopg2-binary`

## 🔧 Development

### Project Structure

- **`app/api/v1/endpoints/`**: Individual endpoint modules
- **`app/core/`**: Core utilities (config, database, security)
- **`app/schemas/`**: Pydantic models for request/response validation
- **`app/services/`**: Business logic services

### Adding New Endpoints

1. Create endpoint file in `app/api/v1/endpoints/`
2. Add router to `app/api/v1/api.py`
3. Create schemas in `app/schemas/`
4. Implement service logic in `app/services/`

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
isort .
```

### Linting
```bash
flake8 .
```

## 🚀 Deployment

### Using Docker (Recommended)
```bash
# Build image
docker build -t wellpal-backend .

# Run container
docker run -p 8000:8000 wellpal-backend
```

### Manual Deployment
1. Set up Python environment on server
2. Install dependencies: `pip install -r requirements.txt`
3. Set environment variables
4. Run with gunicorn: `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker`

## 📝 Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT signing secret
- `OPENAI_API_KEY`: OpenAI API key (for AI features)
- `ANTHROPIC_API_KEY`: Anthropic API key (for AI features)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is part of the WellPal mental wellness application.
