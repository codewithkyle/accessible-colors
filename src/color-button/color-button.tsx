import { h, Component } from 'preact';
import './color-button.scss';
import { hexToRgb, contrast } from '../util/colors';

type ColorButtonProps = {
    index: number;
    activeColorIndex: number;
    color: Color;
    callback: Function;
};

export class ColorButton extends Component<ColorButtonProps, {}> {
    private handleClick: EventListener = () => {
        this.props.callback(this.props.index);
    };
    render() {
        const primaryColor = this.props.color.shades[4];
        const buttonStyle = {
            backgroundColor: primaryColor,
        };
        const rgb = hexToRgb(this.props.color.shades[4]);
        const spanStyle = {
            color: contrast(rgb, { r: 0, g: 0, b: 0 }) >= 7 ? '#000' : '#fff',
        };
        return (
            <button
                onClick={this.handleClick}
                key={this.props.index}
                className={`color-button ${this.props.activeColorIndex === this.props.index ? 'is-active' : ''}`}
                aria-label={`${this.props.color.label} button`}
                style={buttonStyle}
            >
                <span style={spanStyle}>{this.props.color.label}</span>
            </button>
        );
    }
}
