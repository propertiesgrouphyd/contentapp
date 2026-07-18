const STORAGE_KEY =
    window.VW_CONFIG.STORAGE_KEYS.UNIQUE_ID;


function createUniqueId() {

    const random =
        crypto.randomUUID()
            .replace(/-/g, "")
            .substring(0, 12)
            .toUpperCase();

    return `VW-${random}`;

}


function getUniqueId() {

    let id =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!id) {

        id = createUniqueId();

        localStorage.setItem(
            STORAGE_KEY,
            id
        );

    }


    return id;

}


function updateUniqueIdField(id) {

    const field =
        document.getElementById(
            "vw-unique-id"
        );


    if (field) {

        field.value = id;

    }

}


function ensureUniqueId() {

    const id = getUniqueId();

    updateUniqueIdField(id);

    return id;

}


export {

    getUniqueId,
    ensureUniqueId

};
