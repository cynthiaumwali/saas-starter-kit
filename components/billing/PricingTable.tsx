import saasConfig from '@/saas.config';
import { formatPrice, calculateYearlyDiscount } from '@/lib/billing/plan-utils';

export function PricingTable() {
  const visiblePlans = Object.values(saasConfig.plans).filter(plan => !plan.hidden);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {visiblePlans.map(plan => (
        <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          
          <div className="pricing">
            <span className="price">{formatPrice(plan.price.monthly)}</span>
            <span className="period">/month</span>
            
            {plan.price.yearly && (
              <div className="yearly-discount">
                Save {calculateYearlyDiscount(plan.id)}% yearly
              </div>
            )}
          </div>
          
          <ul className="features">
            {plan.features.map(featureId => {
              const feature = saasConfig.features[featureId];
              return (
                <li key={featureId}>
                  {feature.name}
                </li>
              );
            })}
          </ul>
          
          <button className="subscribe-btn">
            Subscribe to {plan.name}
          </button>
        </div>
      ))}
    </div>
  );
}