"use client"

import { useState, useEffect } from 'react'
import type { Stats } from '@/types'

// Mock data - replace with actual API calls
const mockStats: Stats = {
  members: 96000,
  groups: 2100,
  carriers: 4,
  openDiscrepancies: 89,
  groupConnectionRequests: 24,
  badCarrierConnections: 0,
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // Replace this with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStats(mockStats)
      } catch (err) {
        setError('Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
