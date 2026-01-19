"use client"
import { PageHeader } from '@/components/shared/PageHeader'
import { Download } from 'lucide-react'
import { useHome } from '../hooks/useHome'

import { StatsGrid } from '../components/StatsGrid'
import { OrderStatisticsChart } from '../components/OrderStatisticsChart'
import { TrafficByGovernmentChart } from '../components/TrafficByGovernmentChart'
import { ChartsSection } from '../components/ChartsSection'
import { HomeBottomSection } from '../components/HomeBottomSection'

export default function HomeTemplate() {
  const { userName } = useHome()

  return (
    <div className="space-y-8!">
      <PageHeader 
        title={`Welcome ${userName}`} 
        description="Lorem ipsum dolor si amet welcome back jay"
        actionButtons={[
          {
            label: "Export",
            icon: Download,
            variant: "secondary",
            onClick: () => console.log("Export clicked"),
          }
        ]}
      />
      
      <StatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <OrderStatisticsChart />
        </div>
        <div className="lg:col-span-2">
          <TrafficByGovernmentChart />
        </div>
      </div>
      
      <ChartsSection />
    </div>
  )
}
