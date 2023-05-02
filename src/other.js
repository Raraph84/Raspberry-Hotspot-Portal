import { Component } from "react";

export class Info extends Component {
    render() {
        return <div className="info" style={{ color: this.props.color || "red" }}>{this.props.children}</div>
    }
}

export class Loading extends Component {
    render() {
        return <div className="loading"><i className="fa-solid fa-spinner" /></div>
    }
}
