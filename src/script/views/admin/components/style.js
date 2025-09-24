export default function StyleAdminPage() {
    const activeClass = 'bg-brand-primary text-white';
    const inactiveClass = 'text-gray-400';

    function handleStyle() {
        const currentPath = window.location.pathname;
        const navButtons = document.querySelectorAll('[data-nav]');

        navButtons.forEach(button => {
            const route = button.dataset.route;
            if (currentPath.includes(`/admin/${route}`)) {
                button.classList.add(...activeClass.split(' '));
                button.classList.remove(...inactiveClass.split(' '));
            } else {
                button.classList.remove(...activeClass.split(' '));
                button.classList.add(...inactiveClass.split(' '));
            }
        });
    }

    handleStyle()

    return /* html */`
        <style>
            .icon-container svg {
                transition: transform 0.2s ease;
            }
            [data-nav]:hover .icon-container svg {
                transform: scale(1.1);
            }
            .mobile-nav-menu {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
            }
        </style>
    `;
}