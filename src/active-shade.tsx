import { h, Component } from 'preact';
import './active-shade.scss';

type ActiveShadeProps = {
    name: string;
    shades: Array<string> | null;
    deleteCallback: Function;
    updateCallback: Function;
    editCallback: Function;
};

export class ActiveShade extends Component<ActiveShadeProps, {}> {
    private colorChangeEvent: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const index = parseInt(target.dataset.index);
        this.props.updateCallback(index, target.value);
    };

    private deleteColor: EventListener = () => {
        this.props.deleteCallback();
    };

    private editColor: EventListener = () => {
        this.props.editCallback();
    };

    private renderShade = (shade: string, index) => {
        return (
            <div className="shade-button" key={index} tabIndex={0}>
                <input type="color" value={shade} data-index={index} id={`active-shade-${index}`} onChange={this.colorChangeEvent} tabIndex={-1} />
                <label htmlFor={`active-shade-${index}`} style={{ backgroundColor: shade }}></label>
                <div className="tooltip">{shade}</div>
            </div>
        );
    };
    render() {
        if (!this.props.shades) {
            return null;
        }
        return (
            <div className="block bg-white shadow-md px-8 pt-6 pb-8 mb-8 rounded-md">
                <div className="active-shade">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl text-grey-700">{this.props.name}</h2>
                        <div>
                            <button className="mr-2" type="default" kind="text" onClick={this.editColor}>
                                Edit
                            </button>
                            <button type="default" kind="text" onClick={this.deleteColor}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="shades-wrapper">{this.props.shades.map((shade, index) => this.renderShade(shade, index))}</div>
                </div>
            </div>
        );
    }
}
