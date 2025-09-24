export class Spinner {
    constructor() {
        this.spinnerId = 'globalSpinner';
    }

    show(message = 'Loading...') {
        const spinner = document.createElement('div');
        spinner.id = this.spinnerId;
        spinner.innerHTML = /* html */`
            <div class="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50
                        flex flex-col items-center justify-center">
                <div class="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary
                            rounded-full animate-spin"></div>
                <div class="text-white mt-4">${message}</div>
            </div>
        `;
        document.body.appendChild(spinner);
    }

    hide() {
        document.getElementById(this.spinnerId)?.remove();
    }
}