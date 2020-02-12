import { h, render, Component } from 'preact';
import './variables.scss';
import './base.css';

class Application extends Component<{}, {}> {
    render() {
        return null;
    }
}
render(<Application />, document.body.querySelector('#mounting-point'));
