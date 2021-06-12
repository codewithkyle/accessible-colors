import { h, render, Component, Fragment } from 'preact';

import './variables.scss';
import './base.css';
import './app.scss';
import './buttons.scss';
import './color-modal/new-color-modal.scss';
import './footer.scss';
import './export-modal/export-modal.scss';
import './help-modal/help-modal.scss';
import './settings-modal/settings-modal.scss';
import './modal.scss';

import { ColorButton } from './color-button/color-button';
import { openModal } from './color-modal/new-color';
import { GreyscaleTable } from './tables/greyscale-breakdown';
import { ActiveShade } from './active-shade/active-shade';
import { ShadingTable } from './tables/shading-breakdown';
import { exportColors } from './export-modal/export';
import { Color, Settings } from './types';
import { help } from './help-modal/help-modal';
import { openSettings } from './settings-modal/settings-modal';
import { ComparisonTable } from './tables/two-color-breakdown';
import { importColors } from './import-modal/import-modal';

type AppState = {
    colors: Array<Color>;
    activeColorIndex: number;
    secondaryColorIndex: number;
    settings: Settings;
};

class Application extends Component<{}, AppState> {
    private initialColors: Array<Color>;
    private initalSettings: Settings;

    constructor() {
        super();
        this.initialColors = [
            {
                label: "Blue Grey",
                shades: [
                    "#F1F5F9",
                    "#E2E8F0",
                    "#CBD5E1",
                    "#94A3B8",
                    "#64748B",
                    "#475569",
                    "#334155",
                    "#1E293B",
                    "#0F172A",
                ],
            },
            {
                label: "Cool Grey",
                shades: [
                    "#F3F4F6",
                    "#E5E7EB",
                    "#D1D5DB",
                    "#9CA3AF",
                    "#6B7280",
                    "#4B5563",
                    "#374151",
                    "#1F2937",
                    "#111827",
                ],
            },
            {
                label: "Grey",
                shades: [
                    "#F4F4F5",
                    "#E4E4E7",
                    "#D4D4D8",
                    "#A1A1AA",
                    "#71717A",
                    "#52525B",
                    "#3F3F46",
                    "#27272A",
                    "#18181B",
                ],
            },
            {
                label: "True Grey",
                shades: [
                    "#F5F5F5",
                    "#E5E5E5",
                    "#D4D4D4",
                    "#A3A3A3",
                    "#737373",
                    "#525252",
                    "#404040",
                    "#262626",
                    "#171717",
                ],
            },
            {
                label: "Warm Grey",
                shades: [
                    "#F5F5F4",
                    "#E7E5E4",
                    "#D6D3D1",
                    "#A8A29E",
                    "#78716C",
                    "#57534E",
                    "#44403C",
                    "#292524",
                    "#1C1917",
                ],
            },
            {
                label: "Red",
                shades: [
                    "#FEE2E2",
                    "#FECACA",
                    "#FCA5A5",
                    "#F87171",
                    "#EF4444",
                    "#DC2626",
                    "#B91C1C",
                    "#991B1B",
                    "#7F1D1D",
                ],
            },
            {
                label: "Orange",
                shades: [
                    "#FFEDD5",
                    "#FED7AA",
                    "#FDBA74",
                    "#FB923C",
                    "#F97316",
                    "#EA580C",
                    "#C2410C",
                    "#9A3412",
                    "#7C2D12",
                ],
            },
            {
                label: "Amber",
                shades: [
                    "#FEF3C7",
                    "#FDE68A",
                    "#FCD34D",
                    "#FBBF24",
                    "#F59E0B",
                    "#D97706",
                    "#B45309",
                    "#92400E",
                    "#78350F",
                ],
            },
            {
                label: "Yellow",
                shades: [
                    "#FEF9C3",
                    "#FEF08A",
                    "#FDE047",
                    "#FACC15",
                    "#EAB308",
                    "#CA8A04",
                    "#A16207",
                    "#854D0E",
                    "#713F12",
                ],
            },
            {
                label: "Lime",
                shades: [
                    "#ECFCCB",
                    "#D9F99D",
                    "#BEF264",
                    "#A3E635",
                    "#84CC16",
                    "#65A30D",
                    "#4D7C0F",
                    "#3F6212",
                    "#365314",
                ],
            },
            {
                label: "Green",
                shades: [
                    "#DCFCE7",
                    "#BBF7D0",
                    "#86EFAC",
                    "#4ADE80",
                    "#22C55E",
                    "#16A34A",
                    "#15803D",
                    "#166534",
                    "#14532D",
                ],
            },
            {
                label: "Emerald",
                shades: [
                    "#D1FAE5",
                    "#A7F3D0",
                    "#6EE7B7",
                    "#34D399",
                    "#10B981",
                    "#059669",
                    "#047857",
                    "#065F46",
                    "#064E3B",
                ],
            },
            {
                label: "Teal",
                shades: [
                    "#CCFBF1",
                    "#99F6E4",
                    "#5EEAD4",
                    "#2DD4BF",
                    "#14B8A6",
                    "#0D9488",
                    "#0F766E",
                    "#115E59",
                    "#134E4A",
                ],
            },
            {
                label: "Cyan",
                shades: [
                    "#CFFAFE",
                    "#A5F3FC",
                    "#67E8F9",
                    "#22D3EE",
                    "#06B6D4",
                    "#0891B2",
                    "#0E7490",
                    "#155E75",
                    "#164E63",
                ],
            },
            {
                label: "Light Blue",
                shades: [
                    "#E0F2FE",
                    "#BAE6FD",
                    "#7DD3FC",
                    "#38BDF8",
                    "#0EA5E9",
                    "#0284C7",
                    "#0369A1",
                    "#075985",
                    "#0C4A6E",
                ],
            },
            {
                label: "Blue",
                shades: [
                    "#DBEAFE",
                    "#BFDBFE",
                    "#93C5FD",
                    "#60A5FA",
                    "#3B82F6",
                    "#2563EB",
                    "#1D4ED8",
                    "#1E40AF",
                    "#1E3A8A",
                ],
            },
            {
                label: "Indigo",
                shades: [
                    "#E0E7FF",
                    "#C7D2FE",
                    "#A5B4FC",
                    "#818CF8",
                    "#6366F1",
                    "#4F46E5",
                    "#4338CA",
                    "#3730A3",
                    "#312E81",
                ],
            },
            {
                label: "Violet",
                shades: [
                    "#EDE9FE",
                    "#DDD6FE",
                    "#C4B5FD",
                    "#A78BFA",
                    "#8B5CF6",
                    "#7C3AED",
                    "#6D28D9",
                    "#5B21B6",
                    "#4C1D95",
                ],
            },
            {
                label: "Purple",
                shades: [
                    "#F3E8FF",
                    "#E9D5FF",
                    "#D8B4FE",
                    "#C084FC",
                    "#A855F7",
                    "#9333EA",
                    "#7E22CE",
                    "#6B21A8",
                    "#581C87",
                ],
            },
            {
                label: "Fuchsia",
                shades: [
                    "#FAE8FF",
                    "#F5D0FE",
                    "#F0ABFC",
                    "#E879F9",
                    "#D946EF",
                    "#C026D3",
                    "#A21CAF",
                    "#86198F",
                    "#701A75",
                ],
            },
            {
                label: "Pink",
                shades: [
                    "#FCE7F3",
                    "#FBCFE8",
                    "#F9A8D4",
                    "#F472B6",
                    "#EC4899",
                    "#DB2777",
                    "#BE185D",
                    "#9D174D",
                    "#831843",
                ],
            },
            {
                label: "Rose",
                shades: [
                    "#FFE4E6",
                    "#FECDD3",
                    "#FDA4AF",
                    "#FB7185",
                    "#F43F5E",
                    "#E11D48",
                    "#BE123C",
                    "#9F1239",
                    "#881337",
                ],
            },
        ];

        this.initalSettings = {
            offWhite: '#f5f5f5',
            offBlack: '#212121',
        };

        this.state = {
            colors: [],
            activeColorIndex: 0,
            secondaryColorIndex: null,
            settings: null,
        };

        if (location.search.length) {
            const urlParams = this.parseURL(location.href);
            window.history.replaceState(null, document.title, location.origin);
            if (!urlParams) {
                // @ts-ignore
                this.state.colors = this.initialColors;
                // @ts-ignore
                this.state.settings = this.initalSettings;
                return;
            }
            // @ts-ignore
            this.state.colors = urlParams.colors;
            // @ts-ignore
            this.state.settings = urlParams.settings;
            localStorage.setItem('colors', JSON.stringify(this.state.colors));
            localStorage.setItem('settings', JSON.stringify(this.state.settings));
        } else {
            if (localStorage.getItem('colors')) {
                // @ts-ignore
                this.state.colors = JSON.parse(localStorage.getItem('colors'));
            } else {
                // @ts-ignore
                this.state.colors = this.initialColors;
            }
            if (localStorage.getItem('settings')) {
                // @ts-ignore
                this.state.settings = JSON.parse(localStorage.getItem('settings'));
            } else {
                // @ts-ignore
                this.state.settings = this.initalSettings;
            }
        }
    }

    private parseURL(href) {
        const colors: Array<Color> = [];
        const url = new URL(href);
        const settings: Settings = {
            offWhite: `#${url.searchParams.get('off-white')}`,
            offBlack: `#${url.searchParams.get('off-black')}`,
        };
        const colorParams = url.searchParams.getAll('color');
        if (colorParams.length === 0) {
            return null;
        }
        for (let p = 0; p < colorParams.length; p++) {
            if (colorParams[p].length) {
                const vars = colorParams[p].replace(/\|/g, '-').split('-');
                const newColor: Color = {
                    label: vars[0],
                    shades: [],
                };
                for (let i = 1; i < vars.length; i++) {
                    newColor.shades.push(`#${vars[i]}`);
                }
                colors.push(newColor);
            }
        }
        return {
            colors: colors,
            settings: settings,
        };
    }

    private switchActiveColor(index: number) {
        const updatedState = { ...this.state };
        updatedState.activeColorIndex = index;
        if (updatedState.secondaryColorIndex === index) {
            updatedState.secondaryColorIndex = null;
        }
        this.setState(updatedState);
    }

    private switchSecondaryColor(index: number) {
        const updatedState = { ...this.state };
        if (updatedState.activeColorIndex !== index) {
            updatedState.secondaryColorIndex = index;
            this.setState(updatedState);
        }
    }

    componentDidUpdate() {
        localStorage.setItem('colors', JSON.stringify(this.state.colors));
        localStorage.setItem('settings', JSON.stringify(this.state.settings));
    }

    private newColorClick: EventListener = () => {
        openModal()
            .then((newColor: Color) => {
                this.setState({ colors: [...this.state.colors, newColor] });
            })
            .catch(() => {});
    };

    private exportClick: EventListener = () => {
        exportColors(this.state.colors, this.state.settings);
    };

    private settings: EventListener = () => {
        openSettings(this.state.settings)
            .then((settings: Settings) => {
                this.setState({ settings: settings });
            })
            .catch(() => {});
    };

    private openHelpModal: EventListener = () => {
        help();
    };

    private importClick: EventListener = () => {
        importColors()
            .then(href => {
                const urlParams = this.parseURL(href);
                const updatedState = { ...this.state };
                updatedState.colors = urlParams.colors;
                updatedState.settings = urlParams.settings;
                updatedState.secondaryColorIndex = null;
                updatedState.activeColorIndex = 0;
                this.setState(updatedState);
            })
            .catch(() => {});
    };

    private resetColors: EventListener = () => {
        localStorage.removeItem('colors');
        localStorage.removeItem('settings');
        this.setState({ colors: [...this.initialColors], activeColorIndex: 0, settings: { ...this.initalSettings } });
    };

    private deleteColor() {
        const updatedState = { ...this.state };
        updatedState.colors.splice(updatedState.activeColorIndex, 1);
        updatedState.activeColorIndex = 0;
        updatedState.secondaryColorIndex = null;
        this.setState(updatedState);
    }

    private updateShade(index: number, value: string) {
        const updatedState = { ...this.state };
        updatedState.colors[updatedState.activeColorIndex].shades[index] = value;
        this.setState(updatedState);
    }

    private editColor() {
        const updatedState = { ...this.state };
        openModal(updatedState.colors[updatedState.activeColorIndex].label, updatedState.colors[updatedState.activeColorIndex].shades).then((newColor: Color) => {
            updatedState.colors[updatedState.activeColorIndex] = newColor;
            this.setState(updatedState);
        });
    }

    private renderColorButtons = (color: Color, index) => (
        <ColorButton
            index={index}
            color={color}
            activeColorIndex={this.state.activeColorIndex}
            primaryCallback={this.switchActiveColor.bind(this)}
            secondaryCallback={this.switchSecondaryColor.bind(this)}
            secondaryColorIndex={this.state.secondaryColorIndex}
        />
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
                <header className="flex items-center px-8 py-4 bg-white shadow-md">
                    <h1 className="text-grey-700 text-2xl">Accessible Colors</h1>
                    <div className="flex items-center">
                        <button type="default" kind="text" className="mr-2" onClick={this.openHelpModal}>
                            Help
                        </button>
                        <button type="default" kind="text" className="mr-2" onClick={this.resetColors}>
                            Reset
                        </button>
                        <button type="default" kind="text" className="mr-2" onClick={this.settings}>
                            Settings
                        </button>
                        <button type="default" kind="text" onClick={this.importClick}>
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
                        editCallback={this.editColor.bind(this)}
                    />
                    <GreyscaleTable settings={this.state.settings} shades={this.state.colors[this.state.activeColorIndex]?.shades} />
                    <ShadingTable shades={this.state.colors[this.state.activeColorIndex]?.shades} />
                    <ComparisonTable
                        primaryShades={this.state.colors[this.state.activeColorIndex]?.shades}
                        secondaryShades={this.state.colors[this.state.secondaryColorIndex]?.shades}
                    />
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
                        &copy; 2020
                    </span>
                </footer>
            </Fragment>
        );
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
