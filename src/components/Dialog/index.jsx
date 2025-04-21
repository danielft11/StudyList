import { useEffect, useRef } from 'react';
import './dialog.style.css'

// export function Dialog () {

// }

export const Dialog = ({ isOpen, onClose }) => {
    // const dialog = document.querySelector("dialog");
    const refDialog = useRef()

    useEffect(() => {
        console.log("Exibir modal?", isOpen)
        if (isOpen) {
            refDialog.current.showModal();            
        } else {
            refDialog.current.close();
        }
    }, [isOpen])

    // "Show the dialog" button opens the dialog modally
    // const openModal = () => {
    //     console.log('vamos abrir a modal')
    //     refDialog.current.showModal();
    // };

    // "Close" button closes the dialog
    // const closeModal = () => {
    //     refDialog.current.close();
    // };
    return (<>
        <dialog ref={refDialog}>
            <button autoFocus onClick={onClose}>Close</button>
            <p>This modal dialog has a groovy backdrop!</p>
        </dialog>
    </>)
}

export default Dialog;

