import { h, Component } from 'preact';
import { hexToRgb, contrast } from '../util/colors';
import './table.scss';
import { RGB } from '../types';

type ComparisonTableProps = {
    primaryShades: Array<string>;
    secondaryShades: Array<string>;
};

export class ComparisonTable extends Component<ComparisonTableProps, {}> {
    private buildShadingHead = (shade: string) => {
        const rgb = hexToRgb(shade);
        const textColor = contrast(rgb, { r: 0, g: 0, b: 0 }) >= 4.5 ? '#000' : '#fff';
        return <td style={{ backgroundColor: shade, color: textColor }}>{shade}</td>;
    };

    private renderCell(primaryColor, shade, bg, textColor) {
        const secondaryColor = hexToRgb(shade);
        return (
            <td style={{ backgroundColor: bg, color: textColor }}>
                <dl className="tooltip">
                    <dt>AA:</dt>
                    <dd>{contrast(primaryColor, secondaryColor) >= 4.5 ? 'Pass' : 'Fail'}</dd>
                    <dt>AAA:</dt>
                    <dd>{contrast(primaryColor, secondaryColor) >= 7 ? 'Pass' : 'Fail'}</dd>
                </dl>
            </td>
        );
    }

    private renderRow(primaryShade: RGB, textColor: string, bg: string) {
        return (
            <tr>
                <td style={{ backgroundColor: bg, color: textColor }}>{bg}</td>
                {this.props.secondaryShades.map(shade => this.renderCell(primaryShade, shade, bg, textColor))}
            </tr>
        );
    }

    private buildShadingRow = (shade: string) => {
        const rgb = hexToRgb(shade);
        const textColor = contrast(rgb, { r: 0, g: 0, b: 0 }) >= 4.5 ? '#000' : '#fff';
        return this.renderRow(rgb, textColor, shade);
    };

    render() {
        if (!this.props.primaryShades) {
            return null;
        }
        let content = null;
        if (!this.props.secondaryShades) {
            content = <p>Right-click or press and hold a second color to enable the comparison accessibility breakdown.</p>;
        } else {
            content = (
                <table className="breakdown -overflow tooltip-visible">
                    <thead>
                        <tr>
                            <td></td>
                            {this.props.secondaryShades.map(shade => this.buildShadingHead(shade))}
                        </tr>
                    </thead>
                    <tbody>{this.props.primaryShades.map(shade => this.buildShadingRow(shade))}</tbody>
                </table>
            );
        }

        return (
            <div className="block bg-white shadow-md px-8 pb-8 pt-6 mb-8 rounded-md">
                <h2 className="text-2xl text-grey-700 mb-4">Comparison Breakdown</h2>
                {content}
            </div>
        );
    }
}
