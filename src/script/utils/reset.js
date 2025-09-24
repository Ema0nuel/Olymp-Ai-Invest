// Event registry to store all event listeners
const eventRegistry = new Map();

/**
 * Register an event with a unique identifier
 * @param {string} id - Unique identifier for the event group
 * @param {HTMLElement} element - DOM element
 * @param {string} eventType - Type of event (e.g. 'click')
 * @param {Function} handler - Event handler function
 */
export function registerEvent(id, element, eventType, handler) {
    if (!eventRegistry.has(id)) {
        eventRegistry.set(id, []);
    }

    eventRegistry.get(id).push({ element, eventType, handler });
    element.addEventListener(eventType, handler);
}

/**
 * Clean up events by ID
 * @param {string} id - Event group identifier to cleanup
 */
export function cleanup(id) {
    if (eventRegistry.has(id)) {
        const events = eventRegistry.get(id);
        events.forEach(({ element, eventType, handler }) => {
            element.removeEventListener(eventType, handler);
        });
        eventRegistry.delete(id);
    }
}

/**
 * Clean up all registered events
 */
export function cleanupAll() {
    eventRegistry.forEach((events, id) => {
        cleanup(id);
    });
}

/**
 * Reset page state and optionally clean up events
 * @param {string} pageName - Page title
 * @param {string[]} [cleanupIds] - Optional array of IDs to cleanup
 */
export default function reset(pageName, cleanupIds = []) {
    // Smooth scroll to top
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    });

    // Update page title
    document.title = pageName;

    // Cleanup specified event groups
    if (cleanupIds.length) {
        cleanupIds.forEach(id => cleanup(id));
    }
}