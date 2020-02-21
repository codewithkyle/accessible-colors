import { Settings } from '../types';

export function openSettings(settings: Settings) {
    return new Promise((resolve, reject) => {
        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                app.classList.remove('is-blurry');
                container.remove();
                reject();
            }
        });

        const app = document.body.querySelector('#mounting-point') as HTMLElement;
        app.classList.add('is-blurry');
        const container = document.createElement('settings-modal');

        const backdrop = document.createElement('modal-backdrop');
        backdrop.addEventListener('click', () => {
            app.classList.remove('is-blurry');
            container.remove();
            reject();
        });

        const modal = document.createElement('modal-component');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 61.8 61.8"><path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z"/></svg>';
        closeButton.addEventListener('click', () => {
            app.classList.remove('is-blurry');
            container.remove();
            reject();
        });
        modal.appendChild(closeButton);

        const heading = document.createElement('h2');
        heading.innerHTML = 'Settings';
        modal.appendChild(heading);

        const desc = document.createElement('p');
        desc.innerHTML = 'Update the off white and off black value used in the grayscale breakdown.';
        modal.appendChild(desc);

        const inputWrapper = document.createElement('inputs-wrapper');

        const offWhiteWrapper = document.createElement('input-wrapper');
        const offWhiteInput = document.createElement('input');
        const offWhiteLabel = document.createElement('label');
        offWhiteInput.id = 'off-white';
        offWhiteLabel.htmlFor = offWhiteInput.id;
        offWhiteLabel.innerHTML = 'Off White';
        offWhiteInput.value = settings.offWhite;
        offWhiteWrapper.appendChild(offWhiteLabel);
        offWhiteWrapper.appendChild(offWhiteInput);
        inputWrapper.appendChild(offWhiteWrapper);

        const offBlackWrapper = document.createElement('input-wrapper');
        const offBlackInput = document.createElement('input');
        const offBlackLabel = document.createElement('label');
        offBlackInput.id = 'off-black';
        offBlackLabel.htmlFor = offBlackInput.id;
        offBlackLabel.innerHTML = 'Off Black';
        offBlackInput.value = settings.offBlack;
        offBlackWrapper.appendChild(offBlackLabel);
        offBlackWrapper.appendChild(offBlackInput);
        inputWrapper.appendChild(offBlackWrapper);

        modal.appendChild(inputWrapper);

        const submitButton = document.createElement('button');
        submitButton.innerHTML = 'Update';
        submitButton.setAttribute('type', 'default');
        submitButton.setAttribute('kind', 'solid');
        submitButton.addEventListener('click', () => {
            const newSettings = {
                offWhite: `#${offWhiteInput.value
                    .trim()
                    .replace(/^[\#]/g, '')
                    .slice(0, 6)
                    .toUpperCase()}`,
                offBlack: `#${offBlackInput.value
                    .trim()
                    .replace(/^[\#]/g, '')
                    .slice(0, 6)
                    .toUpperCase()}`,
            };
            if (newSettings.offWhite.length < 7) {
                newSettings.offWhite = settings.offWhite;
            }
            if (newSettings.offBlack.length < 7) {
                newSettings.offBlack = settings.offBlack;
            }
            app.classList.remove('is-blurry');
            container.remove();
            resolve(newSettings);
        });
        modal.appendChild(submitButton);

        container.appendChild(backdrop);
        container.appendChild(modal);
        document.body.appendChild(container);
        closeButton.focus();
    });
}
