# Student Profile Management System

A full-stack student profile management system built with Next.js 15, TypeScript, GraphQL, Apollo Server, Apollo Client, Prisma ORM, PostgreSQL, and JWT Authentication.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Apollo Client
- **Backend**: GraphQL, Apollo Server, Next.js API Routes
- **Database**: PostgreSQL, Prisma ORM (v7 with pg adapter)
- **Auth**: JWT, bcryptjs
- **Images**: Local file storage in `public/uploads/`
- **Styling**: Plain CSS (no Tailwind)

## Project Structure

```
student-app/
├── app/
│   ├── page.tsx                  # Home/Landing page
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── dashboard/page.tsx        # Dashboard with stats
│   ├── students/
│   │   ├── page.tsx              # Students list (grid/table)
│   │   ├── create/page.tsx       # Add student
│   │   └── [id]/
│   │       ├── page.tsx          # Student detail
│   │       └── edit/page.tsx     # Edit student
│   └── api/
│       ├── graphql/route.ts      # GraphQL API endpoint
│       └── upload/route.ts       # Image upload endpoint
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── ProtectedRoute.tsx
│   ├── StudentCard.tsx
│   ├── StudentTable.tsx
│   ├── StudentForm.tsx
│   ├── ImageUpload.tsx
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── Providers.tsx
├── graphql/
│   ├── typeDefs.ts               # GraphQL schema
│   ├── resolvers.ts              # GraphQL resolvers
│   └── apolloClient.ts           # Apollo Client setup
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # JWT utilities
│   └── upload.ts                 # Image upload utilities
├── styles/
│   ├── globals.css
│   ├── login.css
│   ├── dashboard.css
│   └── students.css
├── types/index.ts
├── prisma/schema.prisma
├── prisma.config.ts
└── .env
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- PostgreSQL running locally

### 2. Configure Environment

Edit `.env` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/student_profile_db"
JWT_SECRET="your-super-secret-jwt-key"
```

### 3. Create the Database

```sql
CREATE DATABASE student_profile_db;
```

### 4. Run Database Migration

```bash
npx prisma migrate dev --name init
```

Or use db push (no migration history):

```bash
npx prisma db push
```

### 5. Install Dependencies & Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features

- **Auth**: Register, Login, Logout with JWT
- **Protected Routes**: Dashboard and student pages require login
- **Students CRUD**: Create, Read, Update, Delete students
- **Image Upload**: Base64 upload stored in `public/uploads/`
- **View Modes**: Grid cards and table view on students list
- **Responsive**: Works on mobile and desktop

## GraphQL Endpoint

`POST /api/graphql`

### Queries
- `students` – Get all students (auth required)
- `student(id)` – Get student by ID (auth required)
- `me` – Get current user

### Mutations
- `signup(name, email, password)` – Register
- `login(email, password)` – Login
- `createStudent(...)` – Add student (auth required)
- `updateStudent(...)` – Edit student (auth required)
- `deleteStudent(id)` – Remove student (auth required)
