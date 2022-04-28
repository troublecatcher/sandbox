let modalFunctions = {
    modal: document.createElement('div'),
    overlay: document.createElement('div'),
    addModal: () => {
        modalFunctions.modal.id = 'modal',
        modalFunctions.overlay.id = 'overlay';
    
        document.querySelector('body').append(modalFunctions.overlay);
        modalFunctions.overlay.append(modalFunctions.modal);
        container.style.filter = 'blur(7px)';
    
        let close = document.createElement('button');
            close.textContent = 'Закрыть';
            close.id = 'modalCloseBtn';
            modalFunctions.modal.append(close);
            close.onclick = modalFunctions.killModal.bind(this,modal,overlay);
    },
    appendModal: (item) => {
        modalFunctions.modal.append(item);
    },
    killModal: function (){
        modalFunctions.modal.innerHTML = '';
        modalFunctions.overlay.remove();
        container.style.filter = 'none';
    }
}

document.addEventListener('click', (event) => {
    if (event.target == modalFunctions.overlay)
        modalFunctions.killModal();
})
document.addEventListener('keydown', (e) =>  {
    if(e.key === "Escape") {
        modalFunctions.killModal();
    }
})

export let {addModal, appendModal} = modalFunctions;