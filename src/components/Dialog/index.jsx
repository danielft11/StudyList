import './dialog.style.css'

// export function Dialog () {

// }

export const Dialog = () => {
    const dialog = document.querySelector("dialog");

    // "Show the dialog" button opens the dialog modally
    const openModal = () => {
        console.log('vamos abrir a modal')
        dialog.showModal();
    };

    // "Close" button closes the dialog
    const closeModal = () => {
        dialog.close();
    };
    return (<>
        <dialog>
            <button autoFocus onClick={closeModal}>Close</button>
            <p>This modal dialog has a groovy backdrop!</p>
        </dialog>
        <button onClick={openModal}>Show the dialog</button>
    </>)
}

export default Dialog;

