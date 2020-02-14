export function openModal() {
    const app = document.body.querySelector('#mounting-point') as HTMLElement;
    const container = document.createElement('new-color-modal');

    const backdrop = document.createElement('modal-backdrop');
    backdrop.addEventListener('click', () => {
        app.style.filter = 'blur(0)';
        container.remove();
    });

    const modal = document.createElement('modal-component');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 61.8 61.8"><path style="fill:currentColor;" d="M61.8,6.2L55.6,0L30.9,24.7L6.2,0L0,6.2l24.7,24.7L0,55.6l6.2,6.2l24.7-24.7l24.7,24.7l6.2-6.2L37.1,30.9L61.8,6.2z"/></svg>';
    closeButton.addEventListener('click', () => {
        app.style.filter = 'blur(0)';
        container.remove();
    });
    modal.appendChild(closeButton);

    const heading = document.createElement('h2');
    heading.innerHTML = 'New Color';
    modal.appendChild(heading);

    let inputs = [];
    for (let i = 0; i < 9; i++) {
        const wrapper = document.createElement('input-wrapper');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = `shade-${i}`;
        label.htmlFor = input.id;
        label.innerHTML = `Shade ${i + 1}00`;
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
    modal.appendChild(submitButton);

    app.style.filter = 'blur(16px)';
    container.appendChild(backdrop);
    container.appendChild(modal);
    document.body.appendChild(container);
    closeButton.focus();
}
