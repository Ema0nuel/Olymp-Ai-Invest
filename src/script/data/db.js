// Generate 500 unique users
export const users = Array.from({ length: 500 }, (_, i) => {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Isabella', 'Mason', 'Sophia', 'Lucas'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
});

// All countries in the world
export const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    // ...more countries
    'United States', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

// Generate 1000 random amounts from $50 to $1M
export const amounts = Array.from({ length: 1000 }, () => {
    const baseAmount = Math.floor(Math.random() * 999950) + 50; // $50 to $1M
    if (baseAmount >= 1000000) return `${(baseAmount / 1000000).toFixed(1)}M`;
    if (baseAmount >= 1000) return `${(baseAmount / 1000).toFixed(1)}K`;
    return baseAmount.toString();
});


// Brand Logos
export const BRAND_LOGOS = [
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a1183784a3f2f24d_Business-insider-logo.svg', width: '81', alt: 'Business Insider' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a11837b055f2f25d_Yahoo-logo.svg', width: '69', alt: 'Yahoo' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118375bfcf2f351_Focus-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118375592f2f25a_Orf-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118379f6af2f250_Derstandard-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118371831f2f24e_Diepresse-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a11837483df2f25c_Tech-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a1183704e2f2f258_Investing-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a1183733e6f2f257_Grunderszene-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a11837e945f2f24f_Cointelegraph-logo.svg', width: '69', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118378468f2f25b_Sifter-logo.svg', width: '51.5', alt: 'Focus' },
    { image: 'https://cdn.prod.website-files.com/621506e9a1183766b5f2f1f7/621506e9a11837be96f2f251_Kurier-logo.svg', width: '51.5', alt: 'Focus' },
];