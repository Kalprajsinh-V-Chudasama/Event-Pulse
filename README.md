<h1 align="center">
  ⚡ Event Pulse
</h1>

<p align="center">
  A modern, glassmorphism-styled event management dashboard built with React, TypeScript, and Vite.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5-orange?style=for-the-badge" />
</p>

---

## 📖 Overview

**Event Pulse** is a full-featured productivity and event management web application. It combines a sleek dark-mode glassmorphism UI with practical tools for managing events, tasks, notifications, and analytics — all in one place.

---

## ✨ Features

### 🏠 Dashboard
- **Welcome Section** — Time-based greeting (`Good Morning / Afternoon / Evening`) powered by the `useGreeting` hook
- **Stats Grid** — 4 live stat cards (Events Today, Events This Week, Completed Tasks, Upcoming Reminders) with sparkline mini-charts and trend indicators (↑/↓)
- **Upcoming Events** — Quick-glance list of the next scheduled events

### 📅 Calendar
- **Interactive Monthly Calendar** — Full month grid built with `date-fns`; highlights today, selected day, and current-month days
- **Month Navigation** — Previous / Next month buttons plus a "Today" jump button
- **View Switcher** — Toggle between `Month`, `Week`, and `Day` views
- **Event Dots on Days** — Each day cell renders up to 3 colour-coded event chips (by category) and a `+N more` overflow label
- **Per-Day Event Lookup** — `getEventsForDay()` filters the global store by exact date

### 🗓️ Events
- **Event Listing** — Separate sections for Upcoming (sorted chronologically) and Completed events
- **Create Event Modal** — Form-driven modal (`EventCreateModal`) to add a new event with title, date, category, and more
- **Event CRUD** — Zustand `useEventStore` exposes: `addEvent`, `updateEvent`, `deleteEvent`, `toggleComplete`
- **Smart Queries** — `getUpcoming()`, `getToday()`, `getByDate(date)` helpers on the store

### ✅ Tasks / Checklist
- **Task Board** — Separate To-Do and Completed sections with live counts
- **Create Task Modal** — Add tasks with title, description, priority (`low / medium / high`), and optional deadline
- **Task Stats Bar** — 3 stat cards: Total Tasks (with progress bar), Completion Rate %, and Pending count
- **Toggle Complete** — One-click completion toggle; records `completedAt` timestamp automatically
- **`getStats()`** — Returns `{ total, completed, percentage }` computed from the live task list

### 🔔 Notifications
- **Notification Feed** — Full list of notifications with type badges and timestamps
- **Filter Bar** — Filter by: `All`, `Unread`, `Reminder`, `Deadline`, `Missed`, `Completed`
- **Mark as Read / Delete** — Per-card actions plus a global "Mark All Read" button
- **Unread Badge** — `useUnreadCount()` hook drives the live badge count in the sidebar
- **Zustand `useNotificationStore`** — `markAsRead`, `markAllAsRead`, `deleteNotification`, `addNotification`

### 📊 Analytics
- **KPI Cards** — Total Events, Completed Events, Most Active Day, Reminder Effectiveness %
- **Monthly Productivity Bar Chart** — Side-by-side Events vs Tasks bars per month (Recharts)
- **Event Completion Donut Chart** — Pie chart showing completion % with custom inline labels
- **Weekly Area Chart** — Events & Tasks overlaid area chart across the week
- **Activity Overview** — Daily progress bars showing relative event load per weekday

### ⚙️ Settings
- **Notification Preferences** — Toggle Email, Push, and SMS notifications independently
- **Dark / Light Mode** — `useThemeStore` with `toggleTheme()` / `setTheme()`; syncs to `document.documentElement` class
- **Account Settings** — Editable Full Name and Email fields
- **Pricing Plans** — Free / Pro / Enterprise plan cards with feature lists and upgrade buttons

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── calendar/       # CalendarView — interactive monthly grid
│   ├── dashboard/      # StatsGrid, UpcomingEvents, WelcomeSection
│   ├── events/         # EventCard, EventCreateModal
│   ├── layout/         # DashboardLayout, Sidebar, TopNav
│   ├── notifications/  # NotificationCard
│   ├── tasks/          # TaskItem
│   └── ui/             # Avatar, Badge, Button, GlassCard, Input,
│                       #   Modal, ProgressBar, Select, Toggle
├── hooks/
│   ├── useGreeting.ts       # Time-of-day greeting
│   └── useMediaQuery.ts     # Responsive breakpoint detection
├── lib/
│   ├── cn.ts           # clsx + tailwind-merge utility
│   ├── constants.ts    # Priority levels, category options, etc.
│   └── formatters.ts   # formatDate, formatTime, formatDateTime,
│                       #   timeAgo, getGreeting, formatPercentage, formatNumber
├── pages/
│   ├── AnalyticsPage.tsx
│   ├── CalendarPage.tsx
│   ├── DashboardPage.tsx
│   ├── EventsPage.tsx
│   ├── NotificationsPage.tsx
│   ├── SettingsPage.tsx
│   └── TasksPage.tsx
├── store/
│   ├── useEventStore.ts        # Events CRUD + smart queries
│   ├── useNotificationStore.ts # Notification management
│   ├── useSidebarStore.ts      # Sidebar open/close state
│   ├── useTaskStore.ts         # Task CRUD + stats
│   └── useThemeStore.ts        # Dark/Light theme
└── types/
    ├── event.ts
    ├── notification.ts
    ├── task.ts
    └── user.ts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Zustand 5** | Global state management |
| **Recharts** | Bar, Area, and Pie charts |
| **date-fns** | Date formatting and calendar math |
| **React Router DOM 7** | Client-side routing |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **@dnd-kit** | Drag-and-drop support |
| **clsx + tailwind-merge** | Conditional class merging (`cn` utility) |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Kalprajsinh-V-Chudasama/Event-Pulse.git
cd Event-Pulse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build

```bash
npm run build
npm run preview
```

---

## 🧑‍💻 Author

**Kalprajsinh V Chudasama**
- GitHub: [@Kalprajsinh-V-Chudasama](https://github.com/Kalprajsinh-V-Chudasama)
- Email: kvchudasama03@gmail.com

---

<p align="center">Made with ❤️ and ⚡</p>
