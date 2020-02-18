import { h, Component } from 'preact';
import { hexToRgb, contrast } from './colors';

type GreyscaleTableProps = {
    shades: Array<string> | null;
};

export class GreyscaleTable extends Component<GreyscaleTableProps, {}> {
    private buildGrayscaleRow = (shade: string, index: number) => {
        const rgb = hexToRgb(shade);
        const textColor = contrast(rgb, { r: 0, g: 0, b: 0 }) >= 7 ? '#000' : '#fff';
        const white = { r: 255, g: 255, b: 255 };
        const black = { r: 0, g: 0, b: 0 };
        const grey100 = hexToRgb('#f5f5f5');
        const grey900 = hexToRgb('#212121');

        if (index <= 1) {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 2) {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index === 6) {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else if (index >= 7) {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <span>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</span>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, white) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, white) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey100) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey100) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, grey900) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, grey900) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                    <td style={{ backgroundColor: shade, color: textColor }}>
                        <dl className="tooltip">
                            <dt>AA:</dt>
                            <dd>{contrast(rgb, black) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                            <dt>AAA:</dt>
                            <dd>{contrast(rgb, black) >= 7 ? 'Pass' : 'Fail'}</dd>
                        </dl>
                    </td>
                </tr>
            );
        }
    };
    render() {
        if (!this.props.shades) {
            return null;
        }
        const grayscaleRows = this.props.shades.map((shade, index) => this.buildGrayscaleRow(shade, index));
        return (
            <div className="block bg-white shadow-md px-8 pb-8 pt-6 mb-8 rounded-md">
                <h2 className="text-2xl text-grey-700 mb-4">Grayscale Breakdown</h2>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td style={{ backgroundColor: '#fff' }}>#ffffff</td>
                            <td style={{ backgroundColor: '#f5f5f5' }}>#f5f5f5</td>
                            <td style={{ backgroundColor: '#212121', color: '#fff' }}>#212121</td>
                            <td style={{ backgroundColor: '#000', color: '#fff' }}>#000000</td>
                        </tr>
                    </thead>
                    <tbody>{grayscaleRows}</tbody>
                </table>
            </div>
        );
    }
}
