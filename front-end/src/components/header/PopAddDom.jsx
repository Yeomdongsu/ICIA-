import ReactDom from 'react-dom';
 
const PopAddDom = ({ children }) => {
    const el = document.getElementById('popupDom');
    return ReactDom.createPortal(children, el);
};
 
export default PopAddDom;