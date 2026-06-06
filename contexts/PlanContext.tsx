'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { PlanId } from '@/types';
import { getFeatureLimit, hasFeature, isWithinLimit } from '@/lib/billing/plan-utils';

interface PlanContextType {
  currentPlan: PlanId;
  hasFeature: (featureId: string) => boolean;
  getLimit: (featureId: string) => number | 'unlimited';
  isWithinLimit: (featureId: string, usage: number) => boolean;
  canUpgrade: boolean;
  canDowngrade: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

interface PlanProviderProps {
  children: ReactNode;
  currentPlan: PlanId;
}

export function PlanProvider({ children, currentPlan }: PlanProviderProps) {
  const value: PlanContextType = {
    currentPlan,
    hasFeature: (featureId: string) => hasFeature(currentPlan, featureId),
    getLimit: (featureId: string) => getFeatureLimit(currentPlan, featureId),
    isWithinLimit: (featureId: string, usage: number) => 
      isWithinLimit(currentPlan, featureId, usage),
    canUpgrade: currentPlan !== 'enterprise',
    canDowngrade: currentPlan !== 'free',
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}

// Convenience hooks
export function useFeature(featureId: string) {
  const { hasFeature } = usePlan();
  return hasFeature(featureId);
}

export function useLimit(featureId: string) {
  const { getLimit } = usePlan();
  return getLimit(featureId);
}
