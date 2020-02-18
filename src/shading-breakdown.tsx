import { h, Component } from 'preact';
import { hexToRgb, contrast } from './colors';

type ShadingTableProps = {
    shades: Array<string>;
};

export class ShadingTable extends Component<ShadingTableProps, {}> {
    private buildShadingHead = (shade: string, index: number) => {
        const rgb = hexToRgb(shade);
        const textColor = contrast(rgb, { r: 0, g: 0, b: 0 }) >= 7 ? '#000' : '#fff';
        if (index >= 3 && index <= 5) {
            return null;
        }
        return <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>;
    };

    private checkShadeAccessability(shade: RGB, index: number, textColor: string, bg: string) {
        if (index === 0) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 1) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 2) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 6) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 7) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 8) {
            return (
                <tr>
                    <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <span>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: bg, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(shade, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        }
    }

    private buildShadingRow = (shade: string, index: number) => {
        const rgb = hexToRgb(shade);
        const textColor = contrast(rgb, { r: 0, g: 0, b: 0 }) >= 7 ? '#000' : '#fff';
        if (index >= 3 && index <= 5) {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[0])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[0])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[1])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[1])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[2])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[2])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[6])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[6])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[7])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[7])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[8])) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, hexToRgb(this.props.shades[8])) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else {
            return this.checkShadeAccessability(rgb, index, textColor, shade);
        }
    };

    render() {
        if (!this.props.shades) {
            return null;
        }
        return (
            <div className="block bg-white shadow-md px-8 pb-8 pt-6 mb-8 rounded-md">
                <h2 className="text-2xl text-grey-700 mb-4">Shading Breakdown</h2>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {this.props.shades.map((shade, index) => this.buildShadingHead(shade, index))}
                        </tr>
                    </thead>
                    <tbody>{this.props.shades.map((shade, index) => this.buildShadingRow(shade, index))}</tbody>
                </table>
            </div>
        );
    }
}
