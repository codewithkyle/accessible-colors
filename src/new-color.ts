export function openModal(label: string = null, shades: Array<string> = null) {
    return new Promise((resolve, reject) => {
        const app = document.body.querySelector('#mounting-point') as HTMLElement;
        const container = document.createElement('new-color-modal');

        const backdrop = document.createElement('modal-backdrop');
        backdrop.addEventListener('click', () => {
            app.style.filter = 'blur(0)';
            container.remove();
            reject();
        });

        const modal = document.createElement('modal-component');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 61.8 61.8"><path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z"/></svg>';
        closeButton.addEventListener('click', () => {
            app.style.filter = 'blur(0)';
            container.remove();
            reject();
        });
        modal.appendChild(closeButton);

        const heading = document.createElement('h2');
        heading.innerHTML = 'New Color';
        modal.appendChild(heading);

        const desc = document.createElement('p');
        desc.innerHTML = 'Add a new color by providing a unique name along with 9 shades. Shading should range from lightest to darkest.';
        modal.appendChild(desc);

        const colorLabelWrapper = document.createElement('color-label-wrapper');
        const colorLabelInput = document.createElement('input');
        const colorLabelInputLabel = document.createElement('label');
        colorLabelInput.id = 'new-color-label';
        colorLabelInputLabel.htmlFor = colorLabelInput.id;
        colorLabelInputLabel.innerHTML = 'Name';
        if (label) {
            colorLabelInput.value = label;
        }
        colorLabelWrapper.append(colorLabelInputLabel, colorLabelInput);
        modal.append(colorLabelWrapper);

        let inputs = [];
        for (let i = 0; i < 9; i++) {
            const wrapper = document.createElement('input-wrapper');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.id = `shade-${i}`;
            label.htmlFor = input.id;
            label.innerHTML = `Shade ${i + 1}00`;
            if (shades) {
                input.value = shades[i];
            }
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            inputs.push(wrapper);
        }

        const inputsWrapper = document.createElement('inputs-wrapper');
        for (let i = 0; i < inputs.length; i++) {
            inputsWrapper.appendChild(inputs[i]);
        }
        modal.appendChild(inputsWrapper);

        const submitButton = document.createElement('button');
        submitButton.innerHTML = 'Add';
        submitButton.setAttribute('type', 'default');
        submitButton.setAttribute('kind', 'solid');
        submitButton.addEventListener('click', () => {
            const newColor = {
                label: colorLabelInput.value.toLowerCase().trim(),
                shades: [],
            };
            let fail = false;
            inputsWrapper.querySelectorAll('input').forEach(input => {
                if (input.value) {
                    input.classList.remove('is-invalid');
                    if (input.value.match(/^(\#)/g)) {
                        newColor.shades.push(input.value.toUpperCase().trim());
                    } else {
                        newColor.shades.push(`#${input.value.toUpperCase().trim()}`);
                    }
                } else {
                    fail = true;
                    input.classList.add('is-invalid');
                }
            });
            if (!newColor.label) {
                colorLabelInput.classList.add('is-invalid');
                fail = true;
            } else {
                colorLabelInput.classList.remove('is-invalid');
            }
            if (fail) {
                return;
            }
            app.style.filter = 'blur(0)';
            container.remove();
            resolve(newColor);
        });
        modal.appendChild(submitButton);

        app.style.filter = 'blur(16px)';
        container.appendChild(backdrop);
        container.appendChild(modal);
        document.body.appendChild(container);
        closeButton.focus();
    });
}
