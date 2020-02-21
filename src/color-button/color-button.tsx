import { h, Component } from 'preact';
import './color-button.scss';
import { hexToRgb, contrast } from '../util/colors';
import { Color } from '../types';

type ColorButtonProps = {
    index: number;
    activeColorIndex: number;
    secondaryColorIndex: number;
    color: Color;
    primaryCallback: Function;
    secondaryCallback: Function;
};

export class ColorButton extends Component<ColorButtonProps, {}> {
    private handleClick: EventListener = () => {
        this.props.primaryCallback(this.props.index);
    };
    private handleRightClick: EventListener = (e: Event) => {
        e.preventDefault();
        if (this.props.secondaryColorIndex === this.props.index) {
            this.props.secondaryCallback(null);
        } else {
            this.props.secondaryCallback(this.props.index);
        }
    };
    render() {
        const primaryColor = this.props.color.shades[4];
        const rgb = hexToRgb(this.props.color.shades[4]);
        const buttonStyle = {
            backgroundColor: primaryColor,
            color: contrast(rgb, { r: 0, g: 0, b: 0 }) >= 4.5 ? '#000' : '#fff',
        };
        let tag = null;
        if (this.props.activeColorIndex === this.props.index) {
            tag = <span className="tag">Primary</span>;
        } else if (this.props.secondaryColorIndex === this.props.index) {
            tag = <span className="tag">Secondary</span>;
        }
        return (
            <button
                onClick={this.handleClick}
                onContextMenu={this.handleRightClick}
                key={this.props.index}
                className={`color-button ${this.props.activeColorIndex === this.props.index ? 'is-primary' : ''} ${
                    this.props.secondaryColorIndex === this.props.index ? 'is-secondary' : ''
                }`}
                aria-label={`${this.props.color.label} button`}
            >
                <div className="icon" style={buttonStyle}>
                    <span className="label">{this.props.color.label}</span>
                </div>
                {tag}
            </button>
        );
    }
}
