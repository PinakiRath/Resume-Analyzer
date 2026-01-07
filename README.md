# Resume ATS Analyzer

An AI-powered resume analyzer that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and improve their chances of getting past automated screening systems.

## Features

- **ATS Score**: Get your resume's ATS compatibility score to understand how well it passes automated screening systems
- **Skill Extraction**: Identify which skills from the job description are present or missing in your resume
- **Job Role Match**: See how well your resume aligns with the specific job role you're applying for
- **AI-Powered Suggestions**: Receive actionable recommendations to improve your resume and increase interview chances
- **Resume History**: Track and compare previous analyses
- **Export Reports**: Download detailed analysis reports in PDF or JSON format

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **File Upload**: Multer
- **PDF Processing**: pdf-parse
- **AI Integration**: OpenAI API
- **UI Components**: Heroicons
- **State Management**: React Query

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)
- `PUT /api/auth/profile` - Update user profile (requires authentication)

### Resume
- `POST /api/resume/upload` - Upload and analyze resume (requires authentication)
- `GET /api/resume/history` - Get user's resume analysis history (requires authentication)
- `GET /api/resume/:id` - Get specific resume analysis (requires authentication)

### Analysis
- `GET /api/analysis/:id` - Get analysis results (requires authentication)

## Environment Variables

### Backend (.env)
- `PORT`: Port for the backend server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `OPENAI_API_KEY`: OpenAI API key for AI feedback (optional)

## Project Structure

```
Resume Analyzer/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middlewares/     # Authentication middleware
│   ├── utils/          # Utility functions
│   ├── uploads/        # Temporary storage for uploaded files
│   ├── server.js       # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── contexts/   # React contexts
│   │   ├── services/   # Service functions
│   │   ├── hooks/      # Custom hooks
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Usage

1. Register for an account or log in
2. Upload your PDF resume
3. Select the target job role
4. Wait for the analysis to complete
5. Review your ATS score, skill match, and AI-powered suggestions
6. Export your analysis report if needed

## Key Functionality

### ATS Scoring Algorithm
The ATS scoring algorithm considers multiple factors:
- Skill match (40%)
- Keyword density (25%)
- Section presence (15%)
- Formatting quality (10%)
- Resume length (10%)

### Skill Extraction
The system uses a comprehensive skill dictionary with role-specific skills and flexible matching to identify both present and missing skills.

### AI Feedback
When OpenAI API key is provided, the system generates personalized improvement suggestions based on the resume content and target role.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.