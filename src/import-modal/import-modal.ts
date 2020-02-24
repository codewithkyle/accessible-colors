export function importColors() {
    return new Promise((resolve, reject) => {
        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                app.classList.remove('is-blurry');
                container.remove();
                resolve();
            }
        });

        const app = document.body.querySelector('#mounting-point') as HTMLElement;
        app.classList.add('is-blurry');
        const container = document.createElement('import-modal');

        const backdrop = document.createElement('modal-backdrop');
        backdrop.addEventListener('click', () => {
            app.classList.remove('is-blurry');
            container.remove();
            resolve();
        });

        const modal = document.createElement('modal-component');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 61.8 61.8"><path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z"/></svg>';
        closeButton.addEventListener('click', () => {
            app.classList.remove('is-blurry');
            container.remove();
            resolve();
        });
        modal.appendChild(closeButton);

        const heading = document.createElement('h2');
        heading.innerHTML = 'Import';
        modal.appendChild(heading);

        const desc = document.createElement('p');
        desc.innerHTML = 'Import an existing color palette via permalink.';
        modal.appendChild(desc);

        const urlInput = document.createElement('input');
        const urlLabel = document.createElement('label');
        urlInput.id = 'import-url';
        urlInput.type = 'text';
        urlLabel.htmlFor = urlInput.id;
        urlLabel.innerHTML = 'Permalink';
        modal.appendChild(urlLabel);
        modal.appendChild(urlInput);

        const submitButton = document.createElement('button');
        submitButton.innerHTML = 'Import';
        submitButton.setAttribute('type', 'default');
        submitButton.setAttribute('kind', 'solid');
        submitButton.addEventListener('click', () => {
            app.classList.remove('is-blurry');
            container.remove();
            if (urlInput.value !== '') {
                resolve(urlInput.value);
            } else {
                reject();
            }
        });
        modal.appendChild(submitButton);

        container.appendChild(backdrop);
        container.appendChild(modal);
        document.body.appendChild(container);
        closeButton.focus();
    });
}
