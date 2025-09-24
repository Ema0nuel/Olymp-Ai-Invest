import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
    minimum: 0.1,
    showSpinner: false,
    easing: 'ease',
    speed: 500
});

export function startPreloader() {
    NProgress.start();
}

export function stopPreloader() {
    return new Promise(resolve => {
        NProgress.done();
        setTimeout(resolve, 500); // Match the transition duration
    });
}

