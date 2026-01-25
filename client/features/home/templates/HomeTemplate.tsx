"use client"
import { PageHeader } from '@/components/shared/PageHeader'
import { Download } from 'lucide-react'
import { useHome } from '../hooks/useHome'

import { StatsGrid } from '../components/StatsGrid'
import { OrderStatisticsChart } from '../components/OrderStatisticsChart'
import { TrafficByGovernmentChart } from '../components/TrafficByGovernmentChart'
import { ChartsSection } from '../components/ChartsSection'
import { HomeBottomSection } from '../components/HomeBottomSection'

import { useTranslations } from 'next-intl'
import UniLoading from '@/components/shared/UniLoading'

export default function HomeTemplate() {
  const { userName, stats, isLoading } = useHome()
  const t = useTranslations("Dashboard")
  const tCommon = useTranslations("Common")

  if (isLoading) return <UniLoading />

  return (
    <div className="space-y-8!">
      <PageHeader 
        title={`${t("welcome")} ${userName}`} 
        description={tCommon("no_data_desc")}
        actionButtons={[
          {
            label: tCommon("export"),
            icon: Download,
            variant: "secondary",
            onClick: () => console.log("Export clicked"),
          }
        ]}
      />
      
      <StatsGrid stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <OrderStatisticsChart stats={stats} />
        </div>
        <div className="lg:col-span-2">
          <TrafficByGovernmentChart stats={stats} />
        </div>
      </div>
      
      <ChartsSection stats={stats} />
    </div>
  )
}
