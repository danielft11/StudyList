import React, { useRef, useEffect } from "react";
import './custom-dialog.style.css';
import { IconClose } from "../icons";

export function CustomDialog({ isOpen, onClose, children }) {

    const dialogRef = useRef(null);

    // O useEffect é utilizado para executar efeitos colaterais em componentes funcionais. Aqui, estou utilizando-o para monitorar mudanças na prop isOpen.
    // O primeiro parâmetro é uma função que será executada quando o componente for montado ou atualizado.
    // O segundo parâmetro é um array de dependências. Se alguma das dependências mudar, a função será executada novamente.
    useEffect(() => {
        if (isOpen) {
            openDialog();
        } else {
            closeDialog();
        }
    }, [isOpen])

    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.addEventListener('close', onClose) // Adiciona um listener para o evento 'close' do dialog, que chama a função onClose passada como prop.
        return () => {
            dialog?.removeEventListener('close', onClose) // Remove o listener quando o componente for desmontado ou quando onClose mudar.
        }
    }, [onClose]);

    function openDialog() {
        dialogRef.current.showModal();
    };


    const closeDialog = () => {
        dialogRef.current.close();
    };

    return (
        <React.Fragment> 
            <dialog ref={dialogRef} className="dialog"> {/* Aqui estou amarrando o dialogRef ao elemento dialog. */}
                <div className="btn-close-wrapper">
                    <button
                        autoFocus
                        onClick={onClose}
                        className="btn-close">
                        <IconClose />
                    </button>
                </div>
                <div className="dialog-content">
                    {children}
                </div>
            </dialog>
        </React.Fragment>
    )
}