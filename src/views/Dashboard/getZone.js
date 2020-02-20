import ip from "variables/ip.js";
export default async(street, barr, c) => {
    try {

        const sendUri = ip('3020');
        const bodyJSON = {
            street: street,
            barr: barr
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //console.log(`Response1: ${r}`)

            if (r.zona !== undefined) {
                console.log(r.zona[0].valor)
                console.log(r.zona)
                c.setState({zona: r.zona[0].valor})
            }else{
                c.setState({zona: 0})
            }

            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}