import { saasConfig } from '@/saas.config';
import { Plan, PlanId } from '@/types';

export function getPlan(planId: PlanId): Plan {
  return saasConfig.plans[planId];
}

export function getAllPlans(): Plan[] {
  return Object.values(saasConfig.plans).filter(plan => !plan.hidden);
}

export function getVisiblePlans(): Plan[] {
  return getAllPlans().filter(plan => !plan.hidden);
}

export function isPlanHigherThan(planA: PlanId, planB: PlanId): boolean {
  const planOrder = ['free', 'starter', 'professional', 'enterprise'];
  return planOrder.indexOf(planA) > planOrder.indexOf(planB);
}

export function getUpgradePath(currentPlan: PlanId): PlanId[] {
  const planOrder: PlanId[] = ['free', 'starter', 'professional', 'enterprise'];
  const currentIndex = planOrder.indexOf(currentPlan);
  return planOrder.slice(currentIndex + 1);
}

export function getDowngradePath(currentPlan: PlanId): PlanId[] {
  const planOrder: PlanId[] = ['free', 'starter', 'professional', 'enterprise'];
  const currentIndex = planOrder.indexOf(currentPlan);
  return planOrder.slice(0, currentIndex).reverse();
}

export function calculateYearlyDiscount(planId: PlanId): number {
  const plan = getPlan(planId);
  if (!plan.price.yearly) return 0;
  
  const monthlyTotal = plan.price.monthly * 12;
  const yearlyPrice = plan.price.yearly;
  const discount = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
  
  return Math.round(discount);
}

export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

export function hasFeature(planId: PlanId, featureId: string): boolean {
  const plan = getPlan(planId);
  return plan.features.includes(featureId);
}

export function getFeatureLimit(planId: PlanId, featureId: string): number | 'unlimited' {
  const plan = getPlan(planId);
  return plan.limits[featureId] || 0;
}

export function isWithinLimit(
  planId: PlanId, 
  featureId: string, 
  currentUsage: number
): boolean {
  const limit = getFeatureLimit(planId, featureId);
  if (limit === 'unlimited') return true;
  return currentUsage < limit;
}

export function getUsagePercentage(
  planId: PlanId, 
  featureId: string, 
  currentUsage: number
): number {
  const limit = getFeatureLimit(planId, featureId);
  if (limit === 'unlimited') return 0;
  return Math.min((currentUsage / limit) * 100, 100);
}
