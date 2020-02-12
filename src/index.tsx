import { h, render, Component } from 'preact';
import './variables.scss';
import './base.css';
import './app.scss';
import { ColorButton } from './color-button/color-button';

type AppState = {
    colors: Array<Color>;
    activeColorIndex: number;
};

class Application extends Component<{}, AppState> {
    constructor() {
        super();
        this.state = {
            colors: [
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
            ],
            activeColorIndex: 0,
        };
    }

    private switchActiveColor(index: number) {
        this.setState({ activeColorIndex: index });
    }

    private renderColorButtons = (color: Color, index) => (
        <ColorButton index={index} color={color} activeColorIndex={this.state.activeColorIndex} callback={this.switchActiveColor.bind(this)} />
    );

    private newColorClick: EventListener = () => {
        // TODO: Open new color modal
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
                <span>New Color</span>
            </button>
        );
        const colorButtons = (
            <div className="colors">
                <h1 className="block text-4xl text-grey-800 mb-8">Color Palette</h1>
                <div className="button-wrapper">{buttons}</div>
            </div>
        );
        return <div className="app-shell">{colorButtons}</div>;
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
