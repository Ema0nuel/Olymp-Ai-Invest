
import { BRAND_LOGOS } from "../data/db"

export default function Brands() {
    return /* html */`
        <!-- Brand Logos Section -->
        <section class="py-16 bg-brand-dark/90">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    ${BRAND_LOGOS.map(logo => /* html */`
                        <a rel="noopener" 
                            class="group transition-opacity hover:opacity-80">
                            <img src="${logo.image}" alt="${logo.alt}" 
                                    class="h-6 md:h-8 w-auto filter brightness-0 invert opacity-50 
                                        group-hover:opacity-100 transition-opacity"
                                    width="${logo.width}" loading="lazy">
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>
    `
}