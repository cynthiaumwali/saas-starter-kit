import Stripe from 'stripe';
import { stripe } from './stripe';
import { saasConfig } from '@/saas.config';
export async function syncStripeProducts() {
  const results = [];
  
  for (const [planId, plan] of Object.entries(saasConfig.plans)) {
    if (plan.price.monthly === 0) continue; // Skip free plans
    
    try {
      // Create or update Stripe product
      const product = await stripe.products.create({
        id: plan.stripeProductId,
        name: plan.name,
        description: plan.description,
        metadata: {
          planId: plan.id,
          features: plan.features.join(','),
        },
      });
      
      // Create monthly price
      const monthlyPrice = await stripe.prices.create({
        id: plan.stripePriceId?.monthly,
        product: product.id,
        unit_amount: plan.price.monthly,
        currency: saasConfig.billing.defaultCurrency,
        recurring: {
          interval: 'month',
        },
        metadata: {
          planId: plan.id,
          interval: 'monthly',
        },
      });
      
      // Create yearly price if defined
      if (plan.price.yearly) {
        const yearlyPrice = await stripe.prices.create({
          id: plan.stripePriceId?.yearly,
          product: product.id,
          unit_amount: plan.price.yearly,
          currency: saasConfig.billing.defaultCurrency,
          recurring: {
            interval: 'year',
          },
          metadata: {
            planId: plan.id,
            interval: 'yearly',
          },
        });
      }
      
      results.push({ planId, success: true });
    } catch (error) {
      results.push({ planId, success: false, error: error.message });
    }
  }
  
  return results;
}
