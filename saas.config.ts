import { SaasConfig } from "./types";

export const saasConfig: SaasConfig = {
    app: {
        name: 'Your SaaS Name',
        description: 'The best SaaS for [your niche]',
        url: 'https://yourdomain.com',
    },

    // Define your pricing plans
    plans: {
        free: {
            id: 'free',
            name: 'Free',
            description: 'Perfect for getting started',
            price: {
                monthly: 0,
            },
            limits: {
                projects: 3,
                storage: 1, // GB
                apiCalls: 1000,
                teamMembers: 1,
            },
            features: [
                'basicReporting',
                'emailSupport',
                'standardTemplates',
            ],
            stripeProductId: 'prod_free123',
            stripePriceId: {
                monthly: 'price_monthly_free123',
                yearly: 'price_yearly_free123',
            },
        },

        starter: {
            id: 'starter',
            name: 'Starter',
            description: 'Great for individuals and small teams',
            price: {
                monthly: 900, // $9.00 in cents
                yearly: 9000, // $90.00 in cents (2 months free)
            },
            limits: {
                projects: 10,
                storage: 10, // GB
                apiCalls: 10000,
                teamMembers: 3,
            },
            features: [
                'basicReporting',
                'advancedReporting',
                'prioritySupport',
                'standardTemplates',
                'customTemplates',
            ],
            popular: true,
            stripeProductId: 'prod_starter123',
            stripePriceId: {
                monthly: 'price_monthly123',
                yearly: 'price_yearly123',
            },

        },

        professional: {
            id: 'professional',
            name: 'Professional',
            description: 'Advanced features for growing businesses',
            price: {
                monthly: 2900, // $29.00 in cents
                yearly: 29000, // $290.00 in cents
            },
            limits: {
                projects: 50,
                storage: 100, // GB
                apiCalls: 100000,
                teamMembers: 10,
            },
            features: [
                'basicReporting',
                'advancedReporting',
                'customDashboards',
                'prioritySupport',
                'standardTemplates',
                'customTemplates',
                'apiAccess',
                'webhooks',
            ],
            stripeProductId: 'prod_professional123',
            stripePriceId: {
                monthly: 'price_monthly456',
                yearly: 'price_yearly456',
            },
        },

        enterprise: {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Full-featured plan for large organizations',
            price: {
                monthly: 9900, // $99.00 in cents
                yearly: 99000, // $990.00 in cents
            },
            limits: {
                projects: 'unlimited',
                storage: 1000, // GB
                apiCalls: 'unlimited',
                teamMembers: 'unlimited',
            },
            features: [
                'basicReporting',
                'advancedReporting',
                'customDashboards',
                'phoneSupport',
                'standardTemplates',
                'customTemplates',
                'apiAccess',
                'webhooks',
                'sso',
                'customIntegrations',
                'dedicatedManager',
            ],
            stripeProductId: 'prod_enterprise123',
            stripePriceId: {
                monthly: 'price_monthly789',
                yearly: 'price_yearly789',
            },
        },
    },

    // Define features with descriptions
    features: {
        basicReporting: {
            id: 'basicReporting',
            name: 'Basic Reporting',
            description: 'Essential reports and analytics',
        },
        advancedReporting: {
            id: 'advancedReporting',
            name: 'Advanced Reporting',
            description: 'Detailed analytics and custom reports',
        },
        customDashboards: {
            id: 'customDashboards',
            name: 'Custom Dashboards',
            description: 'Build personalized dashboards',
        },
        emailSupport: {
            id: 'emailSupport',
            name: 'Email Support',
            description: '24/7 email support',
        },
        prioritySupport: {
            id: 'prioritySupport',
            name: 'Priority Support',
            description: 'Faster response times',
        },
        phoneSupport: {
            id: 'phoneSupport',
            name: 'Phone Support',
            description: 'Direct phone support',
        },
        standardTemplates: {
            id: 'standardTemplates',
            name: 'Standard Templates',
            description: 'Pre-built templates',
        },
        customTemplates: {
            id: 'customTemplates',
            name: 'Custom Templates',
            description: 'Create your own templates',
        },
        apiAccess: {
            id: 'apiAccess',
            name: 'API Access',
            description: 'Full REST API access',
        },
        webhooks: {
            id: 'webhooks',
            name: 'Webhooks',
            description: 'Real-time event notifications',
        },
        sso: {
            id: 'sso',
            name: 'Single Sign-On',
            description: 'SAML and OAuth SSO',
        },
        customIntegrations: {
            id: 'customIntegrations',
            name: 'Custom Integrations',
            description: 'Bespoke integrations',
        },
        dedicatedManager: {
            id: 'dedicatedManager',
            name: 'Dedicated Manager',
            description: 'Personal account manager',
        },
    },

    // Business rules
    billing: {
        trialDays: 14,
        gracePeriodDays: 3,
        currencies: ['usd'],
        defaultCurrency: 'usd',
    },
};

export default saasConfig
