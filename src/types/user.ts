export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'pro'
  preferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    theme: 'dark' | 'light'
  }
}
