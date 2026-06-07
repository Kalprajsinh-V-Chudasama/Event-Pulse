import { WelcomeSection } from '../components/dashboard/WelcomeSection'
import { StatsGrid } from '../components/dashboard/StatsGrid'
import { UpcomingEvents } from '../components/dashboard/UpcomingEvents'

export function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <WelcomeSection />
      <StatsGrid />
      <UpcomingEvents />
    </div>
  )
}
