# replit.md

## Overview

This is a healthy meal recommendation web application that helps users find nutritious, budget-friendly meals from local restaurants. The platform focuses on supporting local businesses (especially woman-owned, minority-owned, and family-owned establishments) while promoting health-conscious eating and reducing food waste. Users input their dietary goals and budget constraints, and the system recommends matching menu items from nearby restaurants.

The application follows a social good model by prioritizing local economy support, providing affordable healthy options, and enabling food waste reduction through discounted end-of-day surplus meals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built with React 18 using TypeScript, leveraging Vite for bundling and development. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, styled with Tailwind CSS. The application uses wouter for lightweight client-side routing and TanStack Query for server state management. Framer Motion provides animations and micro-interactions throughout the interface.

Key architectural decisions:
- **Component-based architecture**: Reusable UI components with consistent design patterns
- **Type-safe development**: Full TypeScript implementation with shared schemas
- **Client-side routing**: Wouter chosen over React Router for smaller bundle size
- **State management**: TanStack Query handles server state, eliminating need for global state management
- **Styling approach**: Utility-first CSS with Tailwind, component variants using class-variance-authority

### Backend Architecture
The server uses Express.js with TypeScript, implementing a RESTful API architecture. The application follows a modular structure with separate routing, storage, and schema layers. Business logic is centralized in the storage layer, which abstracts data operations behind an interface.

Key architectural decisions:
- **Monolithic structure**: Single server handling both API and static file serving
- **Interface-driven design**: Storage operations defined by IStorage interface for flexibility
- **In-memory storage**: Currently uses MemStorage for development, easily replaceable with database implementation
- **Shared schema**: Type definitions shared between client and server for consistency
- **Middleware approach**: Express middleware for logging, error handling, and request processing

### Data Storage Solutions
The application uses Drizzle ORM with PostgreSQL as the primary database solution. The schema is defined using Drizzle's type-safe schema builder, with automatic TypeScript type generation. Database migrations are managed through Drizzle Kit.

Key architectural decisions:
- **Type-safe ORM**: Drizzle chosen for TypeScript integration and performance
- **PostgreSQL database**: Robust relational database for complex data relationships
- **Schema-first design**: Database schema drives TypeScript types throughout application
- **Migration management**: Version-controlled database changes through Drizzle Kit

The data model includes:
- **User profiles**: Dietary goals, budget constraints, and preferences
- **Restaurant information**: Business details, ownership attributes, and location data
- **Menu items**: Nutritional information, pricing, and availability
- **Recommendations**: Algorithm-generated meal suggestions with scoring

### Authentication and Authorization
The current implementation uses a temporary user system for development purposes. The architecture supports future integration with proper authentication systems.

Key architectural decisions:
- **Stateless design**: API endpoints designed to work with any authentication system
- **User identification**: Currently uses temporary IDs, easily replaceable with proper user management
- **Session handling**: Prepared for cookie-based or token-based authentication

### External Service Integrations
The application is designed to integrate with various external services for enhanced functionality:

- **Neon Database**: Serverless PostgreSQL hosting
- **Google Fonts**: Typography integration
- **Replit services**: Development environment integration with cartographer and dev banner plugins

Key architectural decisions:
- **Modular integration**: External services integrated through abstracted interfaces
- **Development tooling**: Replit-specific plugins for enhanced development experience
- **Font optimization**: Google Fonts preconnected for performance