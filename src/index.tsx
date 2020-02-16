import { h, render, Component } from 'preact';
import './variables.scss';
import './base.css';
import './app.scss';
import './buttons.scss';
import { ColorButton } from './color-button/color-button';
import { openModal } from './new-color';
import './new-color-modal.scss';

type AppState = {
    colors: Array<Color>;
    activeColorIndex: number;
};

class Application extends Component<{}, AppState> {
    private initialColors: Array<Color>;

    constructor() {
        super();
        this.initialColors = [
            {
                label: 'Blue',
                shades: ['#EBF8FF', '#BEE3F8', '#90CDF4', '#63B3ED', '#4299E1', '#3182CE', '#2B6CB0', '#2C5282', '#2A4365'],
            },
            {
                label: 'Success',
                shades: ['#F0FFF4', '#C6F6D5', '#9AE6B4', '#68D391', '#48BB78', '#38A169', '#2F855A', '#276749', '#22543D'],
            },
            {
                label: 'Warning',
                shades: ['#FFFFF0', '#FEFCBF', '#FAF089', '#F6E05E', '#ECC94B', '#D69E2E', '#B7791F', '#975A16', '#744210'],
            },
            {
                label: 'Danger',
                shades: ['#FFF5F5', '#FED7D7', '#FEB2B2', '#FC8181', '#F56565', '#E53E3E', '#C53030', '#9B2C2C', '#742A2A'],
            },
        ];

        this.state = {
            colors: [],
            activeColorIndex: 0,
        };

        const initialColors = localStorage.getItem('colors');
        if (initialColors) {
            // @ts-ignore
            this.state.colors = JSON.parse(initialColors);
        } else {
            // @ts-ignore
            this.state.colors = this.initialColors;
        }
    }

    private switchActiveColor(index: number) {
        this.setState({ activeColorIndex: index });
    }

    componentDidUpdate() {
        localStorage.setItem('colors', JSON.stringify(this.state.colors));
    }

    private newColorClick: EventListener = () => {
        openModal().then((newColor: Color) => {
            this.setState({ colors: [...this.state.colors, newColor] });
        });
    };

    private exportClick: EventListener = () => {
        // TODO: Open a modal and inject color values into a textarea
    };

    private importClick: EventListener = () => {
        // TODO: Open a model and allow the user to provide a hyphen seperated string of hex codes
    };

    private resetColors: EventListener = () => {
        localStorage.removeItem('colors');
        this.setState({ colors: this.initialColors, activeColorIndex: 0 });
    };

    private colorChangeEvent: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const index = parseInt(target.dataset.index);
        const updatedState = { ...this.state };
        updatedState.colors[this.state.activeColorIndex].shades[index] = target.value;
        this.setState(updatedState);
    };

    private renderColorButtons = (color: Color, index) => (
        <ColorButton index={index} color={color} activeColorIndex={this.state.activeColorIndex} callback={this.switchActiveColor.bind(this)} />
    );

    private renderShade = (shade: string, index) => {
        return (
            <div className="shade-button" key={index} tabIndex={0}>
                <input type="color" value={shade} data-index={index} id={`shade-${index}`} onChange={this.colorChangeEvent} tabIndex={-1} />
                <label htmlFor={`shade-${index}`} style={{ backgroundColor: shade }}></label>
                <div className="tooltip">{shade}</div>
            </div>
        );
    };

    render() {
        let buttons = null;
        if (this.state.colors.length) {
            buttons = this.state.colors.map((color, index) => this.renderColorButtons(color, index));
        }
        buttons.push(
            <button className="new-color-button" onClick={this.newColorClick}>
                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="currentColor"
                        d="M304 144h64v64c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-64h64c8.84 0 16-7.16 16-16V96c0-8.84-7.16-16-16-16h-64V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v64h-64c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16zm195.59 220.1l-58.54-26.53-161.19 73.06c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.95 337.57 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40zM12.41 275.9l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L448 299.28V280.7c-15.32 4.38-31.27 7.29-48 7.29-88.01 0-160.72-64.67-173.72-149.04L12.41 235.9c-16.55 7.5-16.55 32.5 0 40z"
                    ></path>
                </svg>
                <span>Add Color</span>
            </button>
        );

        let shades = this.state.colors[this.state.activeColorIndex].shades.map((shade, index) => this.renderShade(shade, index));
        const activeShade = (
            <div className="active-shade">
                <h2 className="text-2xl text-grey-700 mb-4">Shades</h2>
                <div className="shades-wrapper">{shades}</div>
            </div>
        );

        const colorButtons = (
            <div className="colors">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl text-grey-700 mr-4">Color Palette</h1>
                    <div>
                        <button type="default" kind="text" icon="left" className="mr-4" onClick={this.resetColors}>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
                                ></path>
                            </svg>
                            Reset
                        </button>
                        <button type="default" kind="solid" icon="left" className="mr-4" onClick={this.importClick}>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M16 288c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h112v-64zm489-183L407.1 7c-4.5-4.5-10.6-7-17-7H384v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H152c-13.3 0-24 10.7-24 24v264h128v-65.2c0-14.3 17.3-21.4 27.4-11.3L379 308c6.6 6.7 6.6 17.4 0 24l-95.7 96.4c-10.1 10.1-27.4 3-27.4-11.3V352H128v136c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H376c-13.2 0-24-10.8-24-24z"
                                ></path>
                            </svg>
                            Import
                        </button>
                        <button type="default" kind="solid" icon="left" onClick={this.exportClick}>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    fill="currentColor"
                                    d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
                                ></path>
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
                <div className="button-wrapper">{buttons}</div>
                {activeShade}
            </div>
        );
        return <div className="app-shell">{colorButtons}</div>;
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
