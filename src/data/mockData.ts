import type { Event, Task, Notification } from '../types'

const now = new Date()

function hoursFromNow(h: number) {
  const d = new Date(now)
  d.setHours(d.getHours() + h)
  return d
}

function daysFromNow(d: number) {
  const date = new Date(now)
  date.setDate(date.getDate() + d)
  return date
}

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Team Standup',
    description: 'Daily standup meeting with the engineering team',
    date: hoursFromNow(2),
    time: '10:00 AM',
    category: 'meeting',
    priority: 'high',
    reminder: 15,
    repeat: 'daily',
    completed: false,
    createdAt: daysFromNow(-5),
  },
  {
    id: 'e2',
    title: 'Design Review',
    description: 'Review new dashboard mockups with the design team',
    date: hoursFromNow(5),
    time: '2:00 PM',
    category: 'work',
    priority: 'medium',
    reminder: 30,
    repeat: 'none',
    completed: false,
    createdAt: daysFromNow(-3),
  },
  {
    id: 'e3',
    title: 'Gym Session',
    description: 'Evening workout at the gym',
    date: hoursFromNow(8),
    time: '6:00 PM',
    category: 'health',
    priority: 'low',
    reminder: 60,
    repeat: 'weekly',
    completed: false,
    createdAt: daysFromNow(-10),
  },
  {
    id: 'e4',
    title: 'Project Deadline',
    description: 'Final submission of Q2 project deliverables',
    date: daysFromNow(2),
    time: '5:00 PM',
    category: 'work',
    priority: 'high',
    reminder: 1440,
    repeat: 'none',
    completed: false,
    createdAt: daysFromNow(-14),
  },
  {
    id: 'e5',
    title: 'Coffee with Sarah',
    description: 'Catch up over coffee at Starbucks',
    date: daysFromNow(1),
    time: '11:00 AM',
    category: 'social',
    priority: 'medium',
    reminder: 30,
    repeat: 'none',
    completed: false,
    createdAt: daysFromNow(-2),
  },
  {
    id: 'e6',
    title: 'Doctor Appointment',
    description: 'Annual checkup at City Hospital',
    date: daysFromNow(5),
    time: '9:00 AM',
    category: 'health',
    priority: 'high',
    reminder: 1440,
    repeat: 'none',
    completed: false,
    createdAt: daysFromNow(-20),
  },
  {
    id: 'e7',
    title: 'Sprint Planning',
    description: 'Plan sprint goals and tasks for next iteration',
    date: daysFromNow(3),
    time: '10:00 AM',
    category: 'meeting',
    priority: 'high',
    reminder: 15,
    repeat: 'weekly',
    completed: false,
    createdAt: daysFromNow(-7),
  },
  {
    id: 'e8',
    title: 'Birthday Party',
    description: "Alex's birthday celebration at The Rooftop",
    date: daysFromNow(7),
    time: '7:00 PM',
    category: 'social',
    priority: 'low',
    reminder: 60,
    repeat: 'none',
    completed: false,
    createdAt: daysFromNow(-4),
  },
]

export const mockTasks: Task[] = [
  { id: 't1', title: 'Update project roadmap', description: 'Revise Q3 roadmap based on stakeholder feedback', deadline: daysFromNow(3), priority: 'high', completed: false, createdAt: daysFromNow(-2) },
  { id: 't2', title: 'Review pull requests', description: 'Review 3 open PRs on the frontend repo', deadline: hoursFromNow(4), priority: 'medium', completed: false, createdAt: daysFromNow(-1) },
  { id: 't3', title: 'Write API documentation', description: 'Document the new event endpoints', deadline: daysFromNow(5), priority: 'low', completed: false, createdAt: daysFromNow(-3) },
  { id: 't4', title: 'Prepare presentation slides', description: 'Create slides for the all-hands meeting', deadline: daysFromNow(1), priority: 'high', completed: false, createdAt: daysFromNow(-4) },
  { id: 't5', title: 'Fix login bug', description: 'Users unable to login with SSO', deadline: hoursFromNow(2), priority: 'high', completed: false, createdAt: daysFromNow(-1) },
  { id: 't6', title: 'Buy groceries', description: 'Weekly grocery shopping', deadline: hoursFromNow(6), priority: 'low', completed: true, createdAt: daysFromNow(-7), completedAt: daysFromNow(-6) },
  { id: 't7', title: 'Pay electricity bill', description: 'Due before the 15th', deadline: daysFromNow(4), priority: 'medium', completed: true, createdAt: daysFromNow(-10), completedAt: daysFromNow(-8) },
  { id: 't8', title: 'Schedule team building', description: 'Book venue for the team outing', deadline: daysFromNow(10), priority: 'low', completed: false, createdAt: daysFromNow(-5) },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Team Standup in 15 min', message: 'Your daily standup meeting starts soon.', type: 'reminder', read: false, eventId: 'e1', createdAt: hoursFromNow(1.75) },
  { id: 'n2', title: 'Design Review at 2:00 PM', message: "Don't forget the design review with the team.", type: 'reminder', read: false, eventId: 'e2', createdAt: hoursFromNow(4.5) },
  { id: 'n3', title: 'Project Deadline Approaching', message: 'Q2 deliverables are due in 2 days.', type: 'deadline', read: false, eventId: 'e4', createdAt: daysFromNow(1) },
  { id: 'n4', title: 'Gym Session Completed', message: 'You marked your gym session as done. Great work!', type: 'completed', read: true, eventId: 'e3', createdAt: daysFromNow(-1) },
  { id: 'n5', title: 'Missed: Weekly Standup', message: 'You missed the team standup yesterday.', type: 'missed', read: true, eventId: 'e1', createdAt: daysFromNow(-2) },
  { id: 'n6', title: 'Coffee with Sarah Tomorrow', message: "You have coffee with Sarah at 11:00 AM tomorrow.", type: 'reminder', read: false, eventId: 'e5', createdAt: daysFromNow(0.5) },
  { id: 'n7', title: 'Sprint Planning Tomorrow', message: 'Sprint planning is scheduled for tomorrow at 10 AM.', type: 'reminder', read: false, eventId: 'e7', createdAt: daysFromNow(2.5) },
]

export const weeklyChartData = [
  { day: 'Mon', events: 3, tasks: 5 },
  { day: 'Tue', events: 1, tasks: 3 },
  { day: 'Wed', events: 4, tasks: 7 },
  { day: 'Thu', events: 2, tasks: 4 },
  { day: 'Fri', events: 5, tasks: 6 },
  { day: 'Sat', events: 1, tasks: 2 },
  { day: 'Sun', events: 0, tasks: 1 },
]

export const monthlyChartData = [
  { month: 'Jan', events: 12, tasks: 28 },
  { month: 'Feb', events: 15, tasks: 32 },
  { month: 'Mar', events: 18, tasks: 35 },
  { month: 'Apr', events: 10, tasks: 22 },
  { month: 'May', events: 22, tasks: 40 },
  { month: 'Jun', events: 16, tasks: 30 },
]

export const analyticsData = {
  completionRate: 78,
  mostActiveDay: 'Wednesday',
  reminderEffectiveness: 85,
  totalEvents: 8,
  completedEvents: 5,
  totalTasks: 8,
  completedTasks: 2,
}
