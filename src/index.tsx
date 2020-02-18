import { h, render, Component, Fragment } from 'preact';

import './variables.scss';
import './base.css';
import './app.scss';
import './buttons.scss';
import './table.scss';
import './new-color-modal.scss';
import './footer.scss';

import { ColorButton } from './color-button/color-button';
import { openModal } from './new-color';
import { GreyscaleTable } from './greyscale-breakdown';
import { ActiveShade } from './active-shade';
import { ShadingTable } from './shading-breakdown';

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

    private deleteColor() {
        const updatedState = { ...this.state };
        updatedState.colors.splice(updatedState.activeColorIndex, 1);
        updatedState.activeColorIndex = 0;
        this.setState(updatedState);
    }

    private updateShade(index: number, value: string) {
        const updatedState = { ...this.state };
        updatedState.colors[updatedState.activeColorIndex].shades[index] = value;
        this.setState(updatedState);
    }

    private renderColorButtons = (color: Color, index) => (
        <ColorButton index={index} color={color} activeColorIndex={this.state.activeColorIndex} callback={this.switchActiveColor.bind(this)} />
    );

    render() {
        let buttons = [];
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
        return (
            <Fragment>
                <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
                    <h1 className="text-grey-700 text-2xl">Accessible Colors</h1>
                    <div className="flex items-center">
                        <button type="default" kind="text" className="mr-2" onClick={this.resetColors}>
                            Help
                        </button>
                        <button type="default" kind="text" className="mr-2" onClick={this.resetColors}>
                            Reset
                        </button>
                        <button type="default" kind="text" className="mr-2" onClick={this.importClick}>
                            Import
                        </button>
                        <button type="default" kind="text" onClick={this.exportClick}>
                            Export
                        </button>
                    </div>
                </header>
                <div className="app-shell">
                    <div className="block bg-white shadow-md px-8 pt-6 pb-8 mb-8 rounded-md">
                        <h2 className="text-2xl text-grey-700 mb-4">Color Palette</h2>
                        <div className="button-wrapper">{buttons}</div>
                    </div>
                    <ActiveShade
                        shades={this.state.colors[this.state.activeColorIndex]?.shades}
                        name={this.state.colors[this.state.activeColorIndex]?.label}
                        deleteCallback={this.deleteColor.bind(this)}
                        updateCallback={this.updateShade.bind(this)}
                    />
                    <GreyscaleTable shades={this.state.colors[this.state.activeColorIndex]?.shades} />
                    <ShadingTable shades={this.state.colors[this.state.activeColorIndex]?.shades} />
                </div>
                <footer>
                    <span>
                        Created with
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                            ></path>
                        </svg>
                        by
                        <a href="https://kyleandrews.dev/">Kyle Andrews</a>
                    </span>
                </footer>
            </Fragment>
        );
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
