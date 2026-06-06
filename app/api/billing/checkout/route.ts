import { getPlan } from '@/lib/billing/plan-utils';

export default async function handler(req, res) {
  const { planId, interval = 'monthly' } = req.body;
  
  const plan = getPlan(planId);
  if (!plan) {
    return res.status(400).json({ error: 'Invalid plan' });
  }
  
  const priceId = interval === 'yearly' 
    ? plan.stripePriceId?.yearly 
    : plan.stripePriceId?.monthly;
    
  if (!priceId) {
    return res.status(400).json({ error: 'Price not available for this interval' });
  }
  
  // Create Stripe checkout session with priceId
  // ...
}
