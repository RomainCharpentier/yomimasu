export default {
    /**
     * Transforme un schéma d'URI de données en un fichier image.
     * ATTENTION: le schéma doit correspondre à une image.
     *
     * @param {string} dataUri - Le schéma URI de l'image. Ne doit ni
     * être null, ni undefined.
     *
     * @return {string} schéma d'URI de données en fonction du fichier image
     *
     * @see https://fr.wikipedia.org/wiki/Data_URI_scheme
     * @see https://en.wikipedia.org/wiki/Data_URI_scheme
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
     */
    dataURIToImageFile : (dataUri) => {
        if (!dataUri || dataUri === undefined) return null;

        var split = dataUri.match(/^data:([^;]+[;])*(?:base64)?,(.*)/);
        // type MIME
        var mimetype = split[1] || "";

        // données
        var data = Array.from(atob(split[2] || ""));
        for (var i = 0; i < data.length; ++i) {
            data[i] = data[i].charCodeAt(0);
        }

        // recréation du fichier
        var fileDataBuffer = new Uint8Array(data);
        var file = new File([fileDataBuffer.buffer], "imageName", { type: mimetype });

        return URL.createObjectURL(file);
    },

    /**
     * Transforme un fichier image en un schéma d'URI de données.
     * ATTENTION : cette fonction est asynchrone. Pour effectué divers
     * traitements sur le schéma obtenu, vous devez donner un callback
     * qui effectuera ces traitements.
     *
     * @param {File} file - Le fichier image à transformer. Ne doit ni
     * être null, ni undefined.
     * @param {AfterLoadSuccessHandler} afterLoadSuccessAction - Action
     * à executer lorsque l'image sera chargée et que les données seront
     * accessibles. Ne doit ni être null, ni undefined.
     *
     * @return {void}
     *
     * @see AfterLoadSuccessHandler
     * @see https://fr.wikipedia.org/wiki/Data_URI_scheme
     * @see https://en.wikipedia.org/wiki/Data_URI_scheme
     */
    fileToDataURL : (file, afterLoadSuccessAction) => {
        var drawOnCanvasHandler = (mySuperImage, action) => {
            var canvas = document.createElement("canvas");
            canvas.width = mySuperImage.naturalWidth;
            canvas.height = mySuperImage.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(mySuperImage, 0, 0);
            action(mySuperImage, canvas.toDataURL());
        }
        drawOnCanvasHandler.bind(this);

        // création d'une balise <img/> créé à la volé (pas intégrée à la page car c'est inutile)
        var mySuperImage = new Image();
        // on lui donne en source l'url de l'image
        mySuperImage.src = URL.createObjectURL(file);
        // quand elle sera chargé, on lui volera ses données
        mySuperImage.onload = drawOnCanvasHandler.bind(null, mySuperImage, afterLoadSuccessAction);
    }
}