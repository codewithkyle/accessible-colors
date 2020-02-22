let deferredInstallPrompt = null;
const isAndroid = /(android)/i.test(navigator.userAgent);
window.addEventListener('beforeinstallprompt', e => {
    deferredInstallPrompt = e;
    if (!sessionStorage.getItem('prompt') && !isAndroid) {
        setTimeout(() => {
            installPrompt.classList.add('is-visible');
        }, 1000);
    }
});

const installPrompt = document.body.querySelector('install-banner');
const installButton = document.body.querySelector('install-banner #install');
installButton.addEventListener('click', e => {
    deferredInstallPrompt.prompt();
    sessionStorage.setItem('prompt', 'true');
    installPrompt.classList.remove('is-visible');
    deferredInstallPrompt.userChoice.then(() => {
        deferredInstallPrompt = null;
    });
});
const closeButton = document.body.querySelector('install-banner #install-close');
closeButton.addEventListener('click', () => {
    sessionStorage.setItem('prompt', 'true');
    installPrompt.classList.remove('is-visible');
});
