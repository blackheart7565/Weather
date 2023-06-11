
class APIQuery {

    constructor() {}

    getQueryData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, стутус ошибки ${response}`);
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
}
