import saasConfig from "@/saas.config";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSaasConfig(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate app config
  if (!saasConfig.app.name) {
    errors.push('App name is required');
  }
  
  if (!saasConfig.app.url) {
    errors.push('App URL is required');
  }

  // Validate plans
  const planIds = Object.keys(saasConfig.plans);
  if (planIds.length === 0) {
    errors.push('At least one plan is required');
  }

  for (const [planId, plan] of Object.entries(saasConfig.plans)) {
    // Validate plan structure
    if (!plan.name) {
      errors.push(`Plan ${planId} is missing a name`);
    }
    
    if (plan.price.monthly < 0) {
      errors.push(`Plan ${planId} has invalid monthly price`);
    }
    
    if (plan.price.yearly && plan.price.yearly < plan.price.monthly) {
      warnings.push(`Plan ${planId} yearly price is less than monthly`);
    }

    // Validate features exist
    for (const featureId of plan.features) {
      if (!saasConfig.features[featureId]) {
        errors.push(`Plan ${planId} references unknown feature: ${featureId}`);
      }
    }

    // Validate limits
    for (const [limitKey, limitValue] of Object.entries(plan.limits)) {
      if (typeof limitValue !== 'number' && limitValue !== 'unlimited') {
        errors.push(`Plan ${planId} has invalid limit for ${limitKey}`);
      }
    }
  }

  // Validate features
  for (const [featureId, feature] of Object.entries(saasConfig.features)) {
    if (!feature.name) {
      errors.push(`Feature ${featureId} is missing a name`);
    }
  }

  // Validate billing config
  if (saasConfig.billing.trialDays < 0) {
    errors.push('Trial days must be non-negative');
  }
  
  if (saasConfig.billing.gracePeriodDays < 0) {
    errors.push('Grace period days must be non-negative');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Run validation and log results
export function logValidationResults() {
  const result = validateSaasConfig();
  
  if (result.valid) {
    console.log('✅ SaaS configuration is valid');
  } else {
    console.error('❌ SaaS configuration errors:');
    result.errors.forEach(error => console.error(`  - ${error}`));
  }
  
  if (result.warnings.length > 0) {
    console.warn('⚠️ SaaS configuration warnings:');
    result.warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  return result;
}
