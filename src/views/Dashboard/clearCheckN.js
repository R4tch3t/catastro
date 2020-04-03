import renderN from "./renderN";

export default (fa) => {
    const {readOnly} = fa.state
     if (!readOnly){
          renderN('checkerN', [0], 3, [], ['Nueva Orden'], fa);
     }
}