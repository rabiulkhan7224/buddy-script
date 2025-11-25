# BuddyScript Frontend

A modern, responsive social media application frontend built with Next.js, React, and TypeScript. BuddyScript enables users to connect, share posts, and engage through comments and likes in a vibrant community platform.
## live link: https://buddyscript-frontend.vercel.app
## documents https://docs.google.com/document/d/1yq9OhPb9LBPAWb2ZcuVcExPFezkwqp6yZrzY9NiGIYo/edit?usp=sharing
## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## 🎯 About

BuddyScript is a full-featured social media platform that allows users to:
- Create and manage user accounts with secure authentication
- Share posts and stories with the community
- Engage through comments and likes on posts
- Build meaningful connections with other users

This repository contains the frontend application. For the backend API, see the BuddyScript backend repository.

## ✨ Features

### Authentication
- User registration (sign-up) with email and password
- Secure user login with JWT-based authentication
- Protected routes for authenticated users only
- Session management with cookies

### Posts & Feed
- Create, read, update, and delete posts
- Real-time post feed displaying community content
- Like/unlike posts functionality
- Post composer with rich content support

### Comments
- Add comments to posts
- Reply to comments (nested comments)
- Like/unlike comments
- Comment management (edit/delete)

### User Experience
- Responsive design optimized for all devices
- Stories/timeline feature for quick updates
- Right sidebar with additional content/recommendations
- Intuitive navigation bar
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16.0.3** - React framework with server-side rendering and static generation
- **React 19.2.0** - UI library for building interactive components
- **TypeScript 5** - Type-safe JavaScript for better development experience

### State Management
- **Redux Toolkit 2.11.0** - Efficient state management
- **React-Redux 9.2.0** - Redux bindings for React

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components (Label, Separator, Slot)
- **Lucide React** - Beautiful SVG icon library
- **React Icons** - Additional icon library
- **class-variance-authority** - CSS class management
- **clsx** - Utility for conditional CSS classes
- **tailwind-merge** - Merge Tailwind CSS classes

### Form Handling & Validation
- **React Hook Form 7.66.1** - Performant form management
- **@hookform/resolvers** - Form validation resolvers
- **Zod 4.1.12** - TypeScript-first schema validation

### Notifications
- **Sonner** - Toast notification library

### Utilities
- **js-cookie** - Cookie management for authentication tokens

### Development Tools
- **ESLint 9** - Code linting and quality
- **PostCSS 4** - CSS processing

## 📁 Project Structure

```
buddyscript-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── (auth)/                  # Auth layout group
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── sign-up/
│   │       └── page.tsx         # Sign-up page
│   └── (roots)/                 # Main app layout group
│       ├── layout.tsx           # App layout with navbar
│       └── page.tsx             # Home/feed page
│
├── components/                   # Reusable React components
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   ├── auth/                    # Authentication components
│   │   ├── loginForm.tsx        # Login form component
│   │   └── signUpForm.tsx       # Sign-up form component
│   ├── feed/                    # Feed components
│   │   ├── postFeed.tsx         # Post feed display
│   │   └── rightSidebar.tsx     # Right sidebar content
│   ├── home/                    # Home page components
│   │   ├── postComposer.tsx     # Post creation component
│   │   └── storys.tsx           # Stories feature
│   ├── shared/                  # Shared components
│   │   └── navbar.tsx           # Navigation bar
│   └── ui/                      # Basic UI components
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── field.tsx            # Form field component
│       ├── input.tsx            # Input component
│       ├── label.tsx            # Label component
│       ├── separator.tsx        # Separator component
│       └── textarea.tsx         # Textarea component
│
├── lib/                         # Utilities and helpers
│   ├── Provider.tsx             # Redux and other providers
│   ├── utils.ts                 # Utility functions
│   ├── hooks/
│   │   └── auth.ts              # Auth-related hooks
│   ├── redux/
│   │   ├── store.ts             # Redux store configuration
│   │   ├── rootReducer.ts       # Root reducer
│   │   ├── hook.ts              # Redux hooks
│   │   ├── tagType.ts           # RTK Query tag types
│   │   ├── api/
│   │   │   └── baseApi.ts       # RTK Query base API
│   │   └── features/
│   │       ├── auth/
│   │       │   └── authApi.ts   # Auth API endpoints
│   │       ├── post/
│   │       │   └── postApi.ts   # Post API endpoints
│   │       └── comment/
│   │           └── commentApi.ts # Comment API endpoints
│   └── validation/
│       └── auth.ts              # Zod schemas for auth
│
├── public/
│   └── images/                  # Public images and assets
│
├── components.json              # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.mjs           # ESLint configuration
└── package.json                # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rabiulkhan7224/buddy-script.git
cd buddyscript-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory with the required API endpoints:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/v1/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Available Scripts

### `npm run dev`
Runs the development server with hot module reloading.

### `npm run build`
Creates an optimized production build.

### `npm start`
Starts the production server.

### `npm run lint`
Runs ESLint to check code quality and style.

## 🌐 API Integration

The frontend communicates with the BuddyScript backend API through RTK Query. Key API endpoints:

- **Authentication**: `/v1/api/auth/signup`, `/v1/api/auth/login`
- **Posts**: `/v1/api/post` (CRUD operations)
- **Comments**: `/v1/api/comment` (CRUD operations)
- **Likes**: Integrated within post and comment endpoints

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 📦 Key Dependencies Explained

| Package | Purpose |
|---------|---------|
| `next` | React framework with SSR capabilities |
| `react-hook-form` | Efficient form state management |
| `zod` | Runtime type validation |
| `@reduxjs/toolkit` | Redux state management |
| `tailwindcss` | Styling and responsive design |
| `radix-ui` | Accessible UI components |
| `sonner` | Toast notifications |

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a utility-first approach combined with custom components. The `components/ui/` directory contains reusable styled components.

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in cookies for security
- Protected routes ensure only authenticated users can access certain pages
- The `ProtectedRoute` component guards sensitive routes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the BuddyScript platform. Please see the LICENSE file for more details.

## 📧 Support

For support, questions, or feedback, please contact the development team or open an issue on GitHub.

---

**Happy coding! 🎉**
