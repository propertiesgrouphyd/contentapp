"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Global Configuration
   ========================================================================== */


window.VW_CONFIG = Object.freeze({

    APP_NAME:
        "VIDHWAAN AI Writer",

    APP_VERSION:
        "1.0.0",

    DEBUG:
        false,


    API: Object.freeze({

        BASE_URL:
            "https://api.groq.com/openai/v1",

        CHAT_ENDPOINT:
            "/chat/completions",

        MODEL:
            "llama-3.3-70b-versatile"

    }),



    PAYMENT: Object.freeze({

        WORKER_URL:
            "https://bold-fire-78f8.propertiesgrouphyd.workers.dev",

        CREATE_ORDER:
            "/create-order",

        VERIFY_PAYMENT:
            "/verify-payment",

        AMOUNT:
            100,

        PAYMENT_PAGE:
            "https://create.vidhwaan.com/payment",

        PAYMENT_STATUS:
            "https://create.vidhwaan.com/paymentstatus"

    }),



    SUBSCRIPTION: Object.freeze({

        R2_URL:
            "https://subscriptions.propertiesgrouphyd.online/subscriptions",

        CHECK_INTERVAL:
            24 * 60 * 60 * 1000

    }),



    STORAGE_KEYS: Object.freeze({

        API_KEY:
            "vw_api_key",

        UNIQUE_ID:
            "vw_unique_id",

        EXPIRY:
            "vw_expiry",

        LAST_CHECK:
            "vw_last_check",

        HISTORY:
            "vw_history"

    }),



    LIMITS: Object.freeze({

        MAX_PROMPT:
            50000,

        MAX_HISTORY:
            100

    }),



    UI: Object.freeze({

        LOADING_DELAY:
            300,

        TOAST_TIME:
            3000

    })


});
