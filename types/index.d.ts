export interface SaasConfig {
    // Basic app information
    app: AppConfig;

    // Pricing plans
    plans: Record<string, Plan>;

    // Feature definitions
    features: Record<string, Feature>;

    // Business rules
    billing: BillingConfig;
}

export interface AppConfig {
    name: string;
    description: string;
    url: string;
};

export interface BillingConfig {
    trialDays: number;
    gracePeriodDays: number;
    currencies: string[];
    defaultCurrency: string;
};

export interface Feature {
    id: string;
    name: string;
    description: string;
    category?: string;
    icon?: string;
}


export interface Plan {
    id: string;
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly?: number;
    };
    limits: {
        [featureId: string]: number | 'unlimited';
    };
    features: string[];
    popular?: boolean;
    hidden?: boolean;
    stripeProductId?: string,
    stripePriceId?: {
      monthly: string,
      yearly: string,
    },

}

//Utility types
export type PlanId = 'free' | 'starter' | 'professional' | 'enterprise';

export type FeatureId = string;