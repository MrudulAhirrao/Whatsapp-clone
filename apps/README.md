# WhatsApp Clone - Backend API Integration Guide

## Overview
This project has been successfully integrated with the backend API. The frontend now uses real data from the MongoDB database instead of mock data.

## Architecture
- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: Next.js/React with TypeScript
- **Database**: MongoDB Atlas with processed messages

## API Endpoints
- `GET /api/conversations` - Get all conversations
- `GET /api/messages/:conversationId` - Get messages for a specific conversation
- `POST /api/messages` - Send a new message

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Database Population
```bash
cd backend
node populateDb.js
```

### 3. Frontend Setup
```bash
cd frontend-ui
npm install
npm run dev
```

## Integration Changes Made

### 1. API Service Layer
- Created `frontend-ui/app/services/api.ts` for centralized API calls
- Added error handling and consistent response formatting

### 2. Updated Hooks
- **useChat.ts**: Now fetches conversations from `/api/conversations`
- **useMessages.ts**: Now fetches messages from `/api/messages/:conversationId`
- Both hooks use the centralized API service

### 3. Data Mapping
- Backend conversation data is mapped to frontend Chat type
- Backend message data is mapped to frontend Message type
- User information is derived from conversation data

## Running the Application

1. **Start MongoDB** (ensure MongoDB Atlas connection string is in `.env`)
2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```
3. **Start Frontend**:
   ```bash
   cd frontend-ui
   npm start
   ```

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp
PORT=8000
```

## Testing the Integration

1. **Verify Backend**: Visit `http://localhost:8000/` - should show "Hello from the WhatsApp Clone Backend!"
2. **Verify API**: Visit `http://localhost:8000/api/conversations` - should return JSON data
3. **Verify Frontend**: Visit `http://localhost:3000` - should display real conversations from the database

## Troubleshooting

- **CORS Issues**: Ensure backend has CORS enabled (already configured)
- **Connection Issues**: Check MongoDB connection string in `.env`
- **Port Conflicts**: Ensure ports 8000 (backend) and 3000 (frontend) are available
