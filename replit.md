# Baby Care Checklist App

## Overview

A comprehensive web application designed to help parents track their baby's developmental milestones, care tasks, and progress through the first 24 months. The app provides month-by-month checklists covering supplements, play activities, movement milestones, sleep, feeding, and safety, along with developmental information and parenting tips.

**Key Features:**
- Multi-baby support (perfect for twins or families with multiple children)
- Individual progress tracking per baby with persistent storage
- Automatic age calculation and current month detection based on birthdate
- Month-by-month navigation from newborn to 24 months
- Category-based checklists with expandable details
- Visual progress tracking and completion indicators
- Baby profile management (add, switch between, delete profiles)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Single-page application (SPA) architecture with client-side routing via state management

**UI Framework & Design System**
- Shadcn/ui component library built on Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design principles adapted for parenting apps, emphasizing trust, clarity, and calm aesthetics
- Comprehensive light/dark mode support with theme persistence via localStorage
- Design system features calming color palette (soft blues and purples) optimized for reducing parental stress

**State Management**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Local React state for UI-specific concerns
- LocalStorage for persisting user preferences (selected baby, theme)

**Key Frontend Features**
- Multi-baby support with baby selector and management
- Month-by-month navigation (0-24 months) with progress tracking
- Categorized checklists (supplements, play, movement, sleep, feeding, safety)
- Collapsible checklist items with detailed descriptions
- Visual progress indicators and completion badges
- Responsive design optimized for mobile and desktop

### Backend Architecture

**Runtime & Framework**
- Node.js with Express.js for RESTful API server
- TypeScript throughout for type safety across the stack
- ESM module system

**API Design**
- RESTful endpoints following resource-based conventions
- JSON request/response format
- CRUD operations for babies and checklist progress
- Session-based request logging with timing metrics

**Key API Endpoints**
- `GET/POST /api/babies` - Baby management
- `GET/PATCH/DELETE /api/babies/:id` - Individual baby operations
- `GET/POST /api/babies/:id/progress` - Checklist progress tracking

**Development Architecture**
- Vite middleware integration for seamless dev experience
- Hot module replacement in development
- Single build process producing both client and server bundles

### Data Storage Solutions

**Database**
- PostgreSQL as the primary database (via Neon serverless)
- Drizzle ORM for type-safe database operations and migrations
- Schema-driven development with automatic TypeScript types

**Database Schema**
- `users` table - User authentication (username, password)
- `babies` table - Baby profiles (name, birthdate, current_month)
- `checklist_progress` table - Tracks completion status of checklist items per baby

**Data Validation**
- Zod schemas for runtime validation
- Drizzle-Zod integration for automatic schema validation from database definitions
- Input validation on both client and server

**Storage Abstraction**
- IStorage interface provides abstraction layer
- MemStorage implementation for in-memory development/testing
- Design supports swapping storage backends without changing application logic

### Authentication and Authorization

**Current Implementation**
- User schema exists (username/password fields)
- No active authentication middleware implemented
- Session infrastructure present (connect-pg-simple for PostgreSQL sessions)
- Application currently operates without login requirements

**Design Notes**
- Authentication infrastructure is prepared but not enforced
- Future implementation would add session-based auth middleware
- Multi-user support designed into data model

### Code Organization

**Monorepo Structure**
- `/client` - React frontend application
- `/server` - Express backend application  
- `/shared` - Shared types and schemas (database schema, TypeScript types)
- Shared code ensures type safety across client/server boundary

**Path Aliases**
- `@/` - Client source directory
- `@shared/` - Shared code directory
- `@assets/` - Static assets directory

**Component Architecture**
- Atomic component design with reusable UI primitives
- Feature-based page components (Home, MonthDetail)
- Example components in `/client/src/components/examples` for component documentation

## External Dependencies

### Third-Party Services

**Database**
- Neon Database - Serverless PostgreSQL hosting
- Connection via `@neondatabase/serverless` driver
- Requires `DATABASE_URL` environment variable

### Key Libraries

**Frontend**
- `@tanstack/react-query` - Server state management and caching
- `@radix-ui/*` - Headless UI component primitives (17+ components)
- `react-hook-form` + `@hookform/resolvers` - Form handling and validation
- `date-fns` - Date manipulation and formatting
- `embla-carousel-react` - Carousel/slider functionality
- `cmdk` - Command palette interface
- `class-variance-authority` + `clsx` + `tailwind-merge` - Dynamic className management

**Backend**
- `drizzle-orm` - Type-safe ORM
- `drizzle-zod` - Schema validation bridge
- `connect-pg-simple` - PostgreSQL session store
- `zod` - Runtime schema validation

**Build & Development**
- `vite` - Build tool and dev server
- `esbuild` - Server-side bundling
- `tsx` - TypeScript execution for development
- `@replit/vite-plugin-*` - Replit-specific development tools

### Asset Management
- Static images stored in `/attached_assets/generated_images`
- Images for milestone months (sitting, crawling) and hero sections
- Font loading from Google Fonts (Inter, Plus Jakarta Sans)

## Recent Changes

### 2025-10-23: Baby Profile System Implementation
- Added baby profile management with support for multiple babies (twins scenario)
- Implemented individual checklist progress tracking per baby
- Created baby selector component in header for easy switching between babies
- Added baby management dialog for viewing and deleting baby profiles
- Integrated localStorage for persisting selected baby across sessions
- Built automatic age/month calculation from birthdate
- Created comprehensive API endpoints for baby CRUD operations and progress tracking