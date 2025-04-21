import { useRef } from 'react';
import './dialog.style.css'

// export function Dialog () {

// }

export const Dialog = () => {
    // const dialog = document.querySelector("dialog");
    const refDialog = useRef()

    // "Show the dialog" button opens the dialog modally
    const openModal = () => {
        console.log('vamos abrir a modal')
        refDialog.current.showModal();
    };

    // "Close" button closes the dialog
    const closeModal = () => {
        refDialog.current.close();
    };
    return (<>
        <dialog ref={refDialog}>
            <button autoFocus onClick={closeModal}>Close</button>
            <p>This modal dialog has a groovy backdrop!</p>
        </dialog>
    </>)
}

export default Dialog;

