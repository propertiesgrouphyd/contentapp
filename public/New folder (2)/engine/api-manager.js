function getApiKey() {

    return localStorage.getItem(
        window.VW_CONFIG.STORAGE_KEYS.API_KEY
    ) || "";

}


function saveApiKey(key) {

    localStorage.setItem(
        window.VW_CONFIG.STORAGE_KEYS.API_KEY,
        key.trim()
    );

}


function openApiModal() {

    const modal =
        document.getElementById(
            "vw-api-modal"
        );

    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


function closeApiModal() {

    const modal =
        document.getElementById(
            "vw-api-modal"
        );

    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


function ensureApiKey() {

    const key = getApiKey();


    if (!key) {

        openApiModal();

        return false;

    }


    return true;

}


function initializeApiModal() {


    const closeButton =
        document.getElementById(
            "vw-api-close-btn"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeApiModal
        );

    }

    const saveButton =
        document.getElementById(
            "vw-save-api-btn"
        );


    const linkButton =
        document.getElementById(
            "vw-api-link-btn"
        );


    const input =
        document.getElementById(
            "vw-api-key"
        );

    if (linkButton) {

        linkButton.addEventListener(
            "click",
            () => {

                window.open(
                    "https://console.groq.com/keys",
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const key =
                    input.value.trim();


                if (!key) {

                    input.focus();

                    return;

                }


                saveApiKey(
                    key
                );


                closeApiModal();


                const generateButton =
                    document.getElementById(
                        "vw-generate-btn"
                    );


                if (generateButton) {

                    setTimeout(
                        () => generateButton.click(),
                        100
                    );

                }

            }
        );


    }

    const modal =
        document.getElementById(
            "vw-api-modal"
        );

    if (modal) {

        modal.addEventListener(
            "click",
            e => {

                if (
                    e.target === modal
                ) {

                    closeApiModal();

                }

            }
        );

    }

}


export {

    getApiKey,
    saveApiKey,
    ensureApiKey,
    initializeApiModal

};
