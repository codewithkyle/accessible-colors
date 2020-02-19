import { h, Component } from 'preact';
import './color-button.scss';
import { hexToRgb, contrast } from '../util/colors';
import { Color } from '../types';

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
        const rgb = hexToRgb(this.props.color.shades[4]);
        const buttonStyle = {
            backgroundColor: primaryColor,
            color: contrast(rgb, { r: 0, g: 0, b: 0 }) >= 4.5 ? '#000' : '#fff',
        };
        return (
            <button
                onClick={this.handleClick}
                key={this.props.index}
                className={`color-button ${this.props.activeColorIndex === this.props.index ? 'is-active' : ''}`}
                aria-label={`${this.props.color.label} button`}
                style={buttonStyle}
            >
                <span>{this.props.color.label}</span>
            </button>
        );
    }
}
