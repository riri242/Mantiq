# منطق | Mantiq

**Mantiq** is an Arabic-first educational platform designed to help learners build a stronger foundation in software engineering through structured learning paths and practical, accessible content.

The platform brings learning resources together in one place, making it easier for students and aspiring developers to explore software engineering topics, follow courses, and engage with other learners.

## Overview

Mantiq focuses on making software engineering fundamentals easier to approach. Learners can explore available learning paths, view course information, create an account, and participate in course discussions.

## Features

- **Arabic-first experience** — an interface designed primarily for Arabic-speaking learners.
- **Learning paths** — browse available software engineering courses in one place.
- **Course details** — view information and lesson outlines for individual learning paths.
- **Authentication** — Firebase Authentication integration for user accounts.
- **Course discussions** — read, add, and manage comments on course pages.
- **Responsive interface** — layouts designed to adapt across screen sizes.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript |
| Build tooling | Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router |
| UI and animation | Headless UI, Heroicons, Lucide React, Framer Motion, Lottie |
| Backend services | Firebase |

## Getting Started

### Prerequisites

- Node.js (a current LTS release is recommended)
- npm

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/riri242/Mantiq.git
cd Mantiq
npm install
```

### Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in your terminal.

### Production build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code quality

Run the project's ESLint checks:

```bash
npm run lint
```

## Project Structure

```text
Mantiq/
├── public/                 # Static assets and application logo
├── src/
│   ├── assets/             # Images and animation assets
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Reusable React hooks
│   ├── pages/              # Application pages and routes
│   ├── config/             # Application configuration
│   ├── App.tsx             # Main application routes
│   ├── AuthContext.tsx     # Authentication state
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Application Routes

| Route | Purpose |
| --- | --- |
| `/welcome` | Public landing page |
| `/SignPage` | Sign-in and authentication |
| `/main` | Learner home page |
| `/courses` | Browse learning paths |
| `/courses/:courseId` | Course details and comments |
| `/user-info` | User information |
| `/about` | About Mantiq |

## Firebase

Mantiq uses Firebase services for authentication and application data. To run the complete application locally, make sure the Firebase project configuration used by the application is correctly set up and that the required Firebase services and security rules are enabled in your Firebase project.

Do not commit private credentials, service-account keys, or other secrets to the repository.

## Deployment

The application is built with Vite. The production-ready static files are generated in the `dist/` directory.

For Firebase Hosting, configure the Hosting public directory to `dist` and use a rewrite to `/index.html` so client-side routes continue to work when opened directly.

## Contributing

Contributions and suggestions are welcome. For substantial changes, consider opening an issue first to discuss the proposed improvement.

## License

No license has been specified for this repository yet. Unless a license is added, the code remains subject to the repository owner's rights.
