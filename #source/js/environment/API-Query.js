
class APIQuery {

    constructor() {}

    getQueryData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка по адресу <a class="error__link" href="${url}">${url}</a>, стутус ошибки ${response}`);
        }

        return await response.json();
    };
    sendData = async (url, data) => {
        const response = await fetch(url, data);

        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, стутус ошибки ${response}`);
        }

        return await response.json();
    };

    getError(element, flag, messageError = '') {
        if(flag) {
            element.classList.add('active-error');
            element.innerHTML = messageError;
        }
        else {
            element.classList.remove('active-error');
            element.innerHTML = '';
        }
    }
}
