const LANGUAGES = [
    { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
    { code: "fr", label: "Français", flag: "https://flagcdn.com/fr.svg" },
    { code: "es", label: "Español", flag: "https://flagcdn.com/es.svg" },
    { code: "de", label: "Deutsch", flag: "https://flagcdn.com/de.svg" },
    { code: "pt", label: "Português", flag: "https://flagcdn.com/pt.svg" },
    { code: "zh-CN", label: "中文", flag: "https://flagcdn.com/cn.svg" },
    { code: "ar", label: "العربية", flag: "https://flagcdn.com/sa.svg" },
];

export function translateWidget() {
    const selectedLang = localStorage.getItem("selectedLang") || "en";
    const wrapper = document.createElement("div");
    wrapper.className = "fixed bottom-24 left-8 z-40";

    function createButton() {
        const button = document.createElement("button");
        button.className = `
            flex items-center justify-center w-10 h-10 p-1.5
            bg-brand-primary/10 backdrop-blur-xl
            border border-brand-primary/20
            rounded-xl shadow-lg
            transition-all duration-300
            hover:bg-brand-primary hover:border-brand-primary
            focus:outline-none focus:ring-2 focus:ring-brand-primary/50
        `;
        button.innerHTML = `
            <img src="${LANGUAGES.find(l => l.code === selectedLang).flag}" 
                 alt="language" 
                 class="w-full h-full rounded-md transition-transform">
        `;
        return button;
    }

    function createDropdown() {
        const dropdown = document.createElement("div");
        dropdown.className = `
            hidden absolute bottom-12 left-0
            w-48 p-2 rounded-xl
            bg-brand-primary/10 backdrop-blur-xl
            border border-brand-primary/20
            shadow-lg
            transform transition-all duration-300 ease-out
            translate-y-2 opacity-0
        `;

        LANGUAGES.forEach(({ code, label, flag }) => {
            const item = document.createElement("button");
            item.className = `
                flex items-center gap-3 w-full px-3 py-2.5
                text-sm font-medium text-brand-white
                rounded-lg transition-all duration-200
                hover:bg-brand-primary/20
                ${code === selectedLang ? 'bg-brand-primary/30' : ''}
            `;
            item.innerHTML = `
                <img src="${flag}" alt="${code}" class="w-5 h-5 rounded-md">
                <span>${label}</span>
            `;
            item.addEventListener("click", () => handleLanguageChange(code));
            dropdown.appendChild(item);
        });

        return dropdown;
    }

    function handleLanguageChange(code) {
        // Clear existing cookies
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + window.location.hostname + "; path=/";

        // Set language preference
        localStorage.setItem("selectedLang", code);

        if (code === 'en') {
            // For English, just clear the cookie
            localStorage.removeItem("translated");
        } else {
            // For other languages, set the cookie
            const now = new Date();
            const time = now.getTime();
            const expireTime = time + 1000 * 36000;
            now.setTime(expireTime);

            document.cookie = `googtrans=/en/${code}; expires=${now.toUTCString()}; path=/`;
            localStorage.setItem("translated", "true");
        }

        // Reload page
        window.location.reload();
    }

    function initializeTranslation() {
        if (document.getElementById("google_translate_element")) {
            return;
        }

        // Create Google Translate element
        const translateDiv = document.createElement("div");
        translateDiv.id = "google_translate_element";
        translateDiv.style.display = "none";
        document.body.appendChild(translateDiv);

        // Load Google Translate script
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.defer = true;

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: LANGUAGES.map(l => l.code).join(','),
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');

            // Apply stored language
            const storedLang = localStorage.getItem("selectedLang");
            if (storedLang && storedLang !== 'en') {
                const selectElement = document.querySelector('.goog-te-combo');
                if (selectElement) {
                    selectElement.value = storedLang;
                    selectElement.dispatchEvent(new Event('change'));
                }
            }
        };

        document.head.appendChild(script);
    }

    const button = createButton();
    const dropdown = createDropdown();
    let isOpen = false;

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        dropdown.classList.toggle("hidden", !isOpen);

        requestAnimationFrame(() => {
            dropdown.style.transform = isOpen ? "translateY(0)" : "translateY(2px)";
            dropdown.style.opacity = isOpen ? "1" : "0";
        });
    });

    document.addEventListener("click", () => {
        if (isOpen) {
            isOpen = false;
            dropdown.classList.add("hidden");
            dropdown.style.transform = "translateY(2px)";
            dropdown.style.opacity = "0";
        }
    });

    wrapper.appendChild(button);
    wrapper.appendChild(dropdown);
    initializeTranslation();

    return wrapper;
}