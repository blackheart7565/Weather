
class TabMenu {
    #buttonsTabMenu
    #panelContentTabMenu

    constructor(buttonsTabMenu, panelContentTabMenu) {
        this.#buttonsTabMenu = buttonsTabMenu;
        this.#panelContentTabMenu = panelContentTabMenu;
    }

    ActiveContentTabMenu = (element) => {
        if (element.classList.contains('btn-active')) {
            return;
        }

        if (element === this.#buttonsTabMenu[0]) {
            this.#buttonsTabMenu[0].classList.add('btn-active');
            this.#buttonsTabMenu[1].classList.remove('btn-active');

            this.#panelContentTabMenu[0].style.display = 'block';
            this.#panelContentTabMenu[1].style.display = 'none';
        } else {
            this.#buttonsTabMenu[0].classList.remove('btn-active');
            this.#buttonsTabMenu[1].classList.add('btn-active');

            this.#panelContentTabMenu[0].style.display = 'none';
            this.#panelContentTabMenu[1].style.display = 'block';
        }
    };
}