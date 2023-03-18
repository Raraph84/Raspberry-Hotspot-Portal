import { Component, createRef } from "react";
import { createRoot } from "react-dom/client";
import { Info, Loading } from "./other";
import { portalBanned, portalRegister } from "./api";

import "./style.scss";

class Portal extends Component {

    constructor(props) {

        super(props);

        this.firstNameRef = createRef();

        this.state = { requesting: false, info: null, banned: null };
    }

    componentDidMount() {

        this.setState({ requesting: true });
        portalBanned().then((banned) => {
            this.setState({ requesting: false, banned });
        }).catch(() => {
            this.setState({ requesting: false, info: <Info>Un problème est survenu !</Info> });
        });
    }

    render() {

        document.title = !this.state.banned || !this.state.banned.banned ? "Connexion au réseau Wifi" : "Vous êtes bannis du réseau Wifi";

        const register = () => {

            this.setState({ requesting: true, info: null });
            portalRegister(this.firstNameRef.current.value).then(() => {
                window.location.reload();
            }).catch((error) => {
                if (error === "FirstName cannot be empty")
                    this.setState({ requesting: false, info: <Info>Votre prénom ne peut pas être vide !</Info> });
                else if (error === "FirstName too long")
                    this.setState({ requesting: false, info: <Info>Votre prénom doit faire moins de 50 caractères !</Info> });
                else
                    this.setState({ requesting: false, info: <Info>Un problème est survenu !</Info> });
            });
        }

        return <div>

            {this.state.banned ? (!this.state.banned.banned
                ? <div className="title">Connexion au réseau Wifi</div>
                : <div className="title">Vous êtes bannis du réseau Wifi</div>) : null}

            {this.state.requesting ? <Loading /> : null}
            {this.state.info}

            {this.state.banned ? (!this.state.banned.banned ? <div className="box">

                <div>
                    <span className="label">Votre prénom :</span>
                    <input type="text" disabled={this.state.requesting} ref={this.firstNameRef} onKeyDown={(event) => { if (event.key === "Enter") register(); }} />
                </div>

                <div className="message">(Pour que je puisse savoir qui est connecté)</div>

                <button className="button" disabled={this.state.requesting} onClick={() => register()}>Se connecter</button>

            </div> : <div className="box">

                <div className="message">Vous avez été bannis du réseau Wifi pour la raison suivante :</div>
                <div className="message">{this.state.banned.reason}</div>

            </div>) : null}

        </div>;
    }
}

createRoot(document.getElementById("root")).render(<Portal />);
