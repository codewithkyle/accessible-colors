export function help() {
    return new Promise(resolve => {
        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'escape') {
                app.classList.remove('is-blurry');
                container.remove();
                resolve();
            }
        });

        const app = document.body.querySelector('#mounting-point') as HTMLElement;
        app.classList.add('is-blurry');
        const container = document.createElement('help-modal');

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
        heading.innerHTML = 'General';
        modal.appendChild(heading);
        const desc = document.createElement('p');
        desc.innerHTML = `This app is designed to assist in the creation of a systematically accessible color palette and does not generate shades or colors for you. A color is made up of 9 shades that are from lightest (100) to darkest (900).`;
        modal.appendChild(desc);

        const grayscale = document.createElement('h2');
        grayscale.innerHTML = 'Grayscale Breakdown';
        modal.appendChild(grayscale);
        const grayscaleCopy = document.createElement('p');
        grayscaleCopy.innerHTML =
            'The grayscale breakdown requires that a colors first and last 2 shades pass the AAA (7:1) contrast ratio and the 3rd & 6th shades passe the AA (4.5:1) contrast ratio.';
        modal.appendChild(grayscaleCopy);

        const shading = document.createElement('h2');
        shading.innerHTML = 'Shading Breakdown';
        modal.appendChild(shading);
        const shadingCopy = document.createElement('p');
        shadingCopy.innerHTML =
            'The shading breakdown requires that the first 3 and last 3 shades must be accessible with each other. Refer to the table below for the contrast ratios.';
        modal.appendChild(shadingCopy);

        const shadingTable = document.body.querySelector('[tag="shading-table"]').cloneNode(true) as HTMLElement;
        shadingTable.style.display = "block";
        modal.appendChild(shadingTable);

        const comparison = document.createElement('h2');
        comparison.innerHTML = 'Comparison Breakdown';
        modal.appendChild(comparison);
        const comparisonCopy = document.createElement('p');
        comparisonCopy.innerHTML =
            'You can compare all shades of two colors by selecting a primary (left-click) and a secondary (right-click) color from the color palette. This table is used for general color comparison and does not require that any specific shades meet a preset accessibility standard.';
        modal.appendChild(comparisonCopy);

        const attribution = document.createElement('h2');
        attribution.innerHTML = 'Attribution';
        modal.appendChild(attribution);
        const attributionCopy = document.createElement('p');
        attributionCopy.innerHTML =
            'The initial color palette is based upon the <a href="https://github.com/tailwindcss/tailwindcss/blob/master/LICENSE">tailwindcss</a> presets. Inspiration and design based upon <a href="https://webaim.org/resources/contrastchecker/">WebAIM</a> and <a href="https://contrast-grid.eightshapes.com/">Contrast Grid</a>.';
        modal.appendChild(attributionCopy);

        container.appendChild(backdrop);
        container.appendChild(modal);
        document.body.appendChild(container);
        closeButton.focus();
    });
}
