const toastify = ({
    text = "",
    background = "bg-brand-blue/10",
    color = "text-white",
    icon = "",
    duration = 5000
}) => {
    // Remove any existing toast
    document.querySelectorAll('.Olymp AI-toast').forEach(t => t.remove())
    const toast = document.createElement("div")
    toast.className = `Olymp AI-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${background} ${color} hover:border-brand-primary 
        transition-all duration-300`
    toast.innerHTML = `
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${icon ? `<i class="${icon} text-2xl relative z-10 text-brand-primary"></i>` : ""}
        <span class="font-semibold relative z-10">${text}</span>
    `
    document.body.appendChild(toast)
    setTimeout(() => {
        toast.classList.add("animate-fade-out-down")
        setTimeout(() => toast.remove(), 500)
    }, duration)
}

export default toastify