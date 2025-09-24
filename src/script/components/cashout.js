import { users, countries, amounts } from '../data/db.js';

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export default function creditedUsers() {
    const wrapper = document.createElement('div');
    wrapper.className = 'fixed bottom-8 left-8 z-50 pointer-events-none';

    let isAnimating = false;

    function createNotification() {
        if (isAnimating) return;
        isAnimating = true;

        const notification = document.createElement('div');
        notification.className = `
            bg-brand-primary/10 backdrop-blur-md border border-brand-primary/20
            px-4 py-3 rounded-xl shadow-lg transform translate-x-[-120%]
            transition-all duration-300 ease-out max-w-sm
        `;

        notification.innerHTML = `
            <p class="text-brand-white text-sm font-medium flex items-center gap-1">
                <span class="text-brand-primary font-bold">${getRandomItem(users)}</span> 
                <span class="opacity-75">from</span> 
                ${getRandomItem(countries)} 
                <span class="opacity-75">received</span> 
                <span class="text-brand-primary font-bold">$${getRandomItem(amounts)}</span>
            </p>
        `;

        // Clean previous notifications
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }

        // Add and animate new notification
        wrapper.appendChild(notification);


        // Force reflow
        notification.offsetHeight;

        // Slide in
        notification.style.transform = 'translateX(0)';

        // Show for 2 seconds then slide out
        setTimeout(() => {
            notification.style.transform = 'translateX(-120%)';
            notification.style.opacity = '0';

            // Complete animation before next notification
            setTimeout(() => {
                wrapper.removeChild(notification);
                isAnimating = false;
            }, 300); // Exit animation duration
        }, 5000); // Display duration

    }

    // Initial notification
    createNotification();

    // Create new notification every 3.5 seconds (2s display + 0.3s animation + 1.2s pause)
    const interval = setInterval(createNotification, 4000);

    // Cleanup on page change
    window.addEventListener('beforeunload', () => clearInterval(interval));

    return wrapper;
}
