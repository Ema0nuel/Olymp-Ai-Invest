import supabase from './supabaseClients';

let pageLogged = false; // Prevent double logging

export async function trackPageVisit(extra = {}) {
    if (pageLogged) return;
    pageLogged = true;

    try {
        // Get User Info
        const { data: { user } } = await supabase.auth.getUser();

        // Get IP + Geolocation
        let geoData = {};
        try {
            const geoRes = await fetch('https://ipapi.co/json/');
            geoData = await geoRes.json();
        } catch (error) {
            console.error('Geo fetch error:', error);
        }

        // Prepare data
        const logData = {
            table_name: 'page_visit',
            operation: 'VIEW',
            row_data: {
                page: window.location.pathname,
                title: document.title,
                referrer: document.referrer || null,
                ...extra
            },
            ip_address: geoData.ip || null,
            geo: {
                city: geoData.city,
                region: geoData.region,
                country: geoData.country_name,
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                timezone: geoData.timezone
            },
            device_info: {
                user_agent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screen: {
                    width: window.screen.width,
                    height: window.screen.height
                }
            },
            user_id: user?.id || null
        };

        // Log to Supabase
        const { error } = await supabase
            .from('activity_logs')
            .insert([logData]);

        if (error) throw error;

    } catch (err) {
        console.error('Analytics tracking error:', err);
    }
}