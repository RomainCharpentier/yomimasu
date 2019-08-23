import React from 'react';
import API from '../../utils/API';
import { Button, FormGroup, FormControl, FormLabel, Image as Img } from "react-bootstrap";

export class Profile extends React.Component {
    
    constructor(props){
        super(props);
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
        this.displayForm.bind(this);
        this.mySuperImageHandler.bind(this);
        this.fileToDataURL.bind(this);
        this.dataURIToImageFile.bind(this);
    }

    mySuperImageHandler = event => {
        var file = event.target.files[0];

        /// get data
        let data = "";
        var callback = (image, dataURI) => {
            let size = image.naturalWidth + " &times; " + image.naturalHeight;
            data = dataURI;
            console.log(data);
            this.state.avatar = data;
        };
        callback.bind(this);
        this.fileToDataURL(file, callback);
    }

    fileToDataURL = (file, afterLoadSuccessAction) => {
        var drawOnCanvasHandler = (mySuperImage, action) => {
            console.log ("W x H :", mySuperImage.naturalWidth, mySuperImage.naturalHeight);
            var canvas = document.createElement("canvas");
            canvas.width  = mySuperImage.naturalWidth;
            canvas.height = mySuperImage.naturalHeight;
            var ctx = canvas.getContext ("2d");
            ctx.drawImage(mySuperImage, 0, 0);
            action(mySuperImage, canvas.toDataURL());
            this.dataURIToImageFile();
        }
        drawOnCanvasHandler.bind(this);

        // création d'une balise <img/> créé à la volé (pas intégrée à la page car c'est inutile)
        var mySuperImage = new Image();
        // on lui donne en source l'url de l'image
        mySuperImage.src = URL.createObjectURL(file);
        // quand elle sera chargé, on lui volera ses données
        mySuperImage.onload = drawOnCanvasHandler.bind(null, mySuperImage, afterLoadSuccessAction);
    }

   dataURIToImageFile = () => {
        var split = this.state.avatar.match(/^data:([^;]+)?(?:;base64)?,(.*)/);
        // type MIME
        var mimetype = split[1] || "";

        // données
        var data = Array.from (atob (split[2] || ""));
        for (var i = 0; i < data.length; ++i) {
            data[i] = data[i].charCodeAt (0);
        }

        // recréation du fichier
        var fileDataBuffer = new Uint8Array (data);
        var file = new File([fileDataBuffer.buffer], "imageName", { type: mimetype });

        this.setState({
            "avatar_image": URL.createObjectURL(file)
        });
        console.log(URL.createObjectURL(file));
    }

    componentDidMount() {
        const self = this;
        var token = localStorage.getItem("token");
        API.getUser(token).then((data) => {
            const user = data.data.user;
            self.setState({
                "email": user.email,
                "pseudo": user.pseudo,
                "avatar": user.avatar
            });
        }, (error) => {
            console.log(error);
        });
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        var _send = {
            "email": this.state.email,
            "pseudo": this.state.pseudo,
            "avatar": this.state.avatar
        };
        API.updateUser(_send).then((data) => {
            localStorage.setItem("token", data.data.token);
        }, (error) => {
            console.log(error);
            return;
        })
    }

    displayForm = () => {
        const { width, height } = this.state;
        return (
            <div>
                <p>{this.state.email}</p>

                <FormGroup controlId="avatar">
                    <img src={this.state.avatar_image} />
                    <FormControl type="file" accept="image/*" onChange={this.mySuperImageHandler} />
                </FormGroup>

                <FormGroup controlId="pseudo">
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl type="text" value={this.state.pseudo} onChange={this.handleChange} />
                </FormGroup>

                <Button onClick={this.handleSubmit} block type="submit">
                    Modifier
                </Button>
            </div>
        );
    }
    
    render() {
        return (
            <div className="Form">
                <h1>Profil</h1>
                { this.state && this.displayForm() }
            </div>
        );
    }
}