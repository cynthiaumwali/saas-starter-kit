import { saasConfig } from '../saas.config';
import { validateSaasConfig } from '../lib/config-validation';
import { getPlan, hasFeature, calculateYearlyDiscount } from '../lib/billing/plan-utils';

describe('SaaS Configuration', () => {
  test('configuration is valid', () => {
    const result = validateSaasConfig();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('all plans have required properties', () => {
    Object.entries(saasConfig.plans).forEach(([planId, plan]) => {
      expect(plan.id).toBe(planId);
      expect(plan.name).toBeTruthy();
      expect(plan.description).toBeTruthy();
      expect(typeof plan.price.monthly).toBe('number');
      expect(plan.features).toBeInstanceOf(Array);
      expect(plan.limits).toBeDefined();
    });
  });

  test('all referenced features exist', () => {
    Object.values(saasConfig.plans).forEach(plan => {
      plan.features.forEach(featureId => {
        expect(saasConfig.features[featureId]).toBeDefined();
      });
    });
  });

  test('plan utilities work correctly', () => {
    const starterPlan = getPlan('starter');
    expect(starterPlan.name).toBe('Starter');
    
    expect(hasFeature('starter', 'basicReporting')).toBe(true);
    expect(hasFeature('free', 'advancedReporting')).toBe(false);
    
    const discount = calculateYearlyDiscount('starter');
    expect(discount).toBeGreaterThan(0);
  });
});
