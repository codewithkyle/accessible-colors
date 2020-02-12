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

    render() {
        let buttons = null;
        if (this.state.colors.length) {
            buttons = this.state.colors.map((color, index) => this.renderColorButtons(color, index));
        }
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
