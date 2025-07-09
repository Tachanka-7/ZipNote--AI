export const pricingPlans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 9, 
        description: 'For normal users',
        items: [
            '5 PDF Summaries per month',
            'Standard Processing speed',
            'Email Support'
        ],
        paymentLink: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_dRmeV6fsU4pNfxbdBe0oM00'
        : '',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1Rdn9P4C9tlrFk90nRbfK5Yj'
        :''
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19,
        description: 'For professionals and teams',
        items: [
            'Unlimited PDF Summaries',
            'Priority Processing',
            '24/7 priority support',
            'Markdown Export'
        ],
        paymentLink: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_3cI4gsgwY7BZ1GlfJm0oM01': '',
        priceId: process.env.NODE_ENV === 'development' ? ''
        :'price_1Rdn9P4C9tlrFk90HP7Kd3wr'
    }
]

export const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
}

export const itemVariants = {
    hidden: {
        opacity: 0,
        y:20
    },
    visible: {
        opacity: 1, 
        transition: {
            type: "spring" as const,
            damping: 15,
            stiffness: 50,
            duration: 0.8,
        }
    }
}

export const buttonVariants = {
    scale:1.05, 
    transition: {
        type: 'spring' as const,
        stiffness: 300, 
        damping: 10
    }
}

export const listVariant = {
    hidden: {opacity:0, x:-20}, 
    visible: {
        opacity: 1, 
        x:0, 
        transition: {
            type:'spring' as const,
            damping: 20,
            stiffness: 100
        }
    }
}