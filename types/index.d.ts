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

interface AppConfig {
    name: string;
    description: string;
    url: string;
};

interface BillingConfig {
    trialDays: number;
    gracePeriodDays: number;
    currencies: string[];
    defaultCurrency: string;
};

interface Feature {
    id: string;
    name: string;
    description: string;
    category?: string;
    icon?: string;
}


interface Plan {
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
}

//Utility types
export type PlanId = keyof typeof saasConfig.plans;
export type FeatureId = keyof typeof saasConfig.features;