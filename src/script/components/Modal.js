export default class Modal {
    constructor(options = {}) {
        this.options = {
            title: options.title || '',
            content: options.content || '',
            actions: options.actions || [],
            showClose: options.showClose ?? true,
            onClose: options.onClose || (() => { })
        }

        this.element = null
        this.createModal()
    }

    createModal() {
        const modal = document.createElement('div')
        modal.className = 'fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto py-4'

        modal.innerHTML = /* html */`
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-md mx-auto my-auto bg-brand-blue rounded-2xl shadow-xl 
                    border border-brand-primary/20 transform transition-all">
            <!-- Header -->
            ${this.options.title ? `
                <div class="sticky top-0 px-6 py-4 border-b border-brand-primary/20 bg-brand-blue rounded-t-2xl">
                    <h3 class="text-lg font-medium text-white">${this.options.title}</h3>
                </div>
            ` : ''}
            
            <!-- Content -->
            <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
                ${this.options.content}
            </div>

            <!-- Actions -->
            ${this.options.actions.length ? `
                <div class="sticky bottom-0 px-6 py-4 border-t border-brand-primary/20 
                          flex justify-end gap-3 bg-brand-blue rounded-b-2xl">
                    ${this.options.actions.map(action => `
                        <button class="px-4 py-2 rounded-xl transition-colors
                                   ${action.primary ?
                'bg-brand-primary text-brand-blue hover:bg-opacity-90' :
                'border border-brand-primary/30 text-white hover:bg-brand-primary/20'}"
                                data-action="${action.text}">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}

            ${this.options.showClose ? `
                <button class="absolute top-4 right-4 text-gray-400 hover:text-white 
                             transition-colors" data-close>
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
        </div>
    `
        this.element = modal
        this.setupListeners()
    }

    setupListeners() {
        // Close button
        const closeBtn = this.element.querySelector('[data-close]')
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide())
        }

        // Action buttons
        this.options.actions.forEach(action => {
            const btn = this.element.querySelector(`[data-action="${action.text}"]`)
            if (btn) {
                btn.addEventListener('click', () => action.onClick(() => this.hide()))
            }
        })

        // Background click
        this.element.querySelector('.absolute').addEventListener('click', (e) => {
            if (e.target === e.currentTarget && this.options.showClose) {
                this.hide()
            }
        })
    }

    show() {
        document.body.appendChild(this.element)
        requestAnimationFrame(() => {
            this.element.querySelector('.relative').style.opacity = '0'
            this.element.querySelector('.relative').style.transform = 'scale(0.95)'
            requestAnimationFrame(() => {
                this.element.querySelector('.relative').style.opacity = '1'
                this.element.querySelector('.relative').style.transform = 'scale(1)'
            })
        })
    }

    hide() {
        const modal = this.element.querySelector('.relative')
        modal.style.opacity = '0'
        modal.style.transform = 'scale(0.95)'
        setTimeout(() => {
            this.element.remove()
            this.options.onClose()
        }, 150)
    }
}