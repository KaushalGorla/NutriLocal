# NutriLocal 🥗

**Healthy • Local • Affordable**

NutriLocal is a web application that helps users discover nutritious, budget-friendly meals from local restaurants while supporting community businesses and reducing food waste.

## ✨ Features

### 🎯 Personalized Meal Discovery
- **Smart Recommendations**: Get personalized meal suggestions based on your dietary goals, budget, and preferences
- **AI-Powered Analysis**: Upload health documents (PDFs) for customized nutrition recommendations using Google Gemini AI
- **Weekly Meal Planning**: Generate complete meal plans tailored to your nutritional needs and budget

### 🌍 Local Business Support
- **Community Focus**: Prioritize woman-owned, minority-owned, and family-owned restaurants
- **Local Economy**: Support your community while eating healthy
- **Impact Tracking**: See how your choices contribute to local job creation and community impact

### 📍 Location-Based Discovery
- **Restaurant Map**: Find nearby restaurants with healthy options
- **Detailed Profiles**: View restaurant information, ownership details, and community impact
- **Menu Integration**: Browse nutritional information and pricing for menu items

### 📊 Nutrition & Budget Management
- **Dietary Goals**: Set calorie, protein, carb, and fat targets
- **Budget Tracking**: Stay within your meal budget with price-conscious recommendations
- **Nutritional Analysis**: Detailed nutrition information for all recommended meals

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** + **shadcn/ui** for styling
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **Framer Motion** for animations
- **Three.js** for 3D elements

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **PostgreSQL** with **Drizzle ORM**
- **Google Gemini AI** for personalized recommendations
- **Multer** for file uploads (PDF processing)

### Development Tools
- **Vite** development server
- **ESBuild** for production builds
- **Drizzle Kit** for database migrations
- **Replit** integration plugins

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nutrilocal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
nutrilocal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities and configurations
│   │   └── main.tsx       # Frontend entry point
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data access layer
│   ├── gemini-service.ts # AI service integration
│   └── db.ts             # Database configuration
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema and types
├── package.json         # Project dependencies
└── vite.config.ts       # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## 🌟 Key Pages

### 🏠 Home (`/`)
Landing page introducing the platform's mission and value proposition

### 🔍 Discover (`/discover`)
- Set up your dietary profile
- View personalized meal recommendations
- Generate weekly meal plans

### 🗺️ Map (`/map`)
Interactive map showing nearby restaurants with healthy options

### 📈 Impact (`/impact`)
Community impact dashboard showing local business support metrics

### 🤖 AI Meals (`/ai-meals`)
Upload health documents for AI-powered personalized nutrition recommendations

## 🎨 Design System

The application uses a modern design system built with:
- **Color Palette**: HSL-based color system for consistent theming
- **Typography**: Optimized font stacks with proper fallbacks
- **Components**: Radix UI primitives with custom styling
- **Animations**: Smooth micro-interactions with Framer Motion

## 🔐 API Endpoints

### User Profiles
- `POST /api/user-profile` - Create user profile
- `GET /api/user-profile/:userId` - Get user profile
- `PUT /api/user-profile/:userId` - Update user profile

### Restaurants & Menu Items
- `GET /api/restaurants` - List restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/menu-items` - Get menu items with filtering

### AI Services
- `POST /api/ai-recommendations` - Get AI meal recommendations
- `POST /api/analyze-document` - Analyze health documents
- `POST /api/weekly-meal-plan` - Generate meal plans

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Database Schema

The application uses PostgreSQL with the following main entities:
- **Users**: Basic user information
- **User Profiles**: Dietary goals, budgets, and preferences
- **Restaurants**: Business information and community impact metrics
- **Menu Items**: Detailed nutrition and pricing information
- **User Recommendations**: Personalized meal suggestions

## 🔮 Future Enhancements

- **Mobile App**: React Native companion app
- **Social Features**: Meal sharing and community challenges
- **Advanced Analytics**: Detailed nutrition and spending insights
- **Restaurant Partnership**: Direct ordering integration
- **Meal Prep Integration**: Grocery shopping and prep planning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Local Restaurant Partners**: Supporting community businesses
- **Google Gemini AI**: Powering intelligent recommendations
- **Open Source Community**: Built with amazing open-source tools

---

**Made with ❤️ for healthier communities and local businesses**

For questions or support, please open an issue on this repository.