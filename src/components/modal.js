const escKeyHandler = ((evt) => {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
});

export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', escKeyHandler);
};

export const closeModal= (modal) => {
    modal.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', escKeyHandler);
};

export const handleClose = (el) => {
    const btnClose = el.querySelector('.popup__close');
    btnClose.addEventListener('click', () => {
        closeModal(el);
    });
    el.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(el);
        };
    });
}