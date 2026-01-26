"use client"
import { Download } from 'lucide-react'
import { useHome } from '../hooks/useHome'

import { StatsGrid } from '../components/StatsGrid'
import { ChartsSection } from '../components/ChartsSection'

import { useTranslations } from 'next-intl'
import UniLoading from '@/components/shared/UniLoading'

import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { OrderStatisticsChart } from '../components/OrderStatisticsChart'
import { TrafficByGovernmentChart } from '../components/TrafficByGovernmentChart'
import { PageHeader } from "@/components/shared/PageHeader";
import { HomeSkeleton } from "../components/HomeSkeleton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomeTemplate() {
  const { isLoading, stats } = useHome()
  const t = useTranslations("Dashboard")

  if (isLoading) return <HomeSkeleton />

  return (
    <PageTransition>
      <motion.div 
        className="space-y-8 pb-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header Section */}
        <motion.div variants={item}>
          <PageHeader
            title={t("title")}
            description={t("subtitle")}
            actionButtons={[
              {
                label: t("export_report"),
                icon: Download,
                variant: "secondary",
                onClick: () => console.log("Export clicked")
              }
            ]}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item}>
          <StatsGrid stats={stats} isLoading={isLoading} />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-1">
            <OrderStatisticsChart stats={stats} />
          </div>
          <div className="lg:col-span-2">
            <TrafficByGovernmentChart stats={stats} />
          </div>
        </motion.div>

        {/* Charts & Recent Orders */}
        <motion.div variants={item} className="space-y-8">
          <ChartsSection />
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
