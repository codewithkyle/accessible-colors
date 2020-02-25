import { Color, Settings } from '../types';

export function exportColors(colors: Array<Color>, settings: Settings) {
    return new Promise(resolve => {
        if (colors.length === 0) {
            resolve();
            return;
        }

        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                app.classList.remove('is-blurry');
                container.remove();
                resolve();
            }
        });

        const app = document.body.querySelector('#mounting-point') as HTMLElement;
        app.classList.add('is-blurry');
        const container = document.createElement('export-modal');

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
        heading.innerHTML = 'Export';
        modal.appendChild(heading);

        const desc = document.createElement('p');
        desc.innerHTML = 'Colors are available preformatted for the SASS and CSS variable formats.';
        modal.appendChild(desc);

        const urlInput = document.createElement('input');
        const urlLabel = document.createElement('label');
        urlInput.id = 'export-url';
        urlInput.type = 'text';
        urlInput.value = `${location.origin}?`;
        urlLabel.htmlFor = urlInput.id;
        urlLabel.innerHTML = 'Permalink';
        for (let i = 0; i < colors.length; i++) {
            urlInput.value += `${i !== 0 ? '&' : ''}color=${colors[i].label}-`;
            for (let s = 0; s < colors[i].shades.length; s++) {
                urlInput.value += `${colors[i].shades[s].replace('#', '')}${s < colors[i].shades.length - 1 ? '-' : ''}`;
            }
        }
        urlInput.value += `&off-white=${settings.offWhite.replace('#', '').trim()}`;
        urlInput.value += `&off-black=${settings.offBlack.replace('#', '').trim()}`;
        modal.appendChild(urlLabel);
        modal.appendChild(urlInput);

        const varsContainer = document.createElement('vars-container');

        const cssTextareaLabel = document.createElement('label');
        const cssTextarea = document.createElement('textarea');
        cssTextarea.id = 'css-vars';
        cssTextareaLabel.htmlFor = cssTextarea.id;
        cssTextareaLabel.innerHTML = 'CSS';
        cssTextareaLabel.classList.add('-half');
        for (let i = 0; i < colors.length; i++) {
            cssTextarea.innerHTML += `/* ${colors[i].label} */\n`;
            for (let s = 0; s < colors[i].shades.length; s++) {
                cssTextarea.innerHTML += `--${colors[i].label}-${s + 1}00: ${colors[i].shades[s]};\n${s === colors[i].shades.length - 1 ? '\n' : ''}`;
            }
        }

        const scssTextareaLabel = document.createElement('label');
        const scssTextarea = document.createElement('textarea');
        scssTextarea.id = 'css-vars';
        scssTextareaLabel.htmlFor = scssTextarea.id;
        scssTextareaLabel.innerHTML = 'SASS';
        scssTextareaLabel.classList.add('-half');
        for (let i = 0; i < colors.length; i++) {
            scssTextarea.innerHTML += `/* ${colors[i].label} */\n`;
            for (let s = 0; s < colors[i].shades.length; s++) {
                scssTextarea.innerHTML += `$${colors[i].label}-${s + 1}00: ${colors[i].shades[s]};\n${s === colors[i].shades.length - 1 ? '\n' : ''}`;
            }
        }

        varsContainer.appendChild(cssTextareaLabel);
        varsContainer.appendChild(scssTextareaLabel);
        varsContainer.appendChild(cssTextarea);
        varsContainer.appendChild(scssTextarea);
        modal.appendChild(varsContainer);

        container.appendChild(backdrop);
        container.appendChild(modal);
        document.body.appendChild(container);
        closeButton.focus();
    });
}
