"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Subscription Manager

   Flow:

   Local Storage
        |
        |
   Unique ID
        |
        |
   Public R2 JSON
        |
        |
   Validate Expiry

   Production Version
   ========================================================================== */

import Storage from "./storage.js";

const SubscriptionManager = {

    async check() {

        const uniqueId = Storage.getString(
            VW_CONFIG.STORAGE_KEYS.UNIQUE_ID,
            ""
        );

        if (!uniqueId) {

            return {

                active: false,

                uniqueId: null,

                expires: null

            };

        }

        const cachedExpiry = Number(

            Storage.getString(

                VW_CONFIG.STORAGE_KEYS.EXPIRY,

                "0"

            )

        );

        const lastCheck = Number(

            Storage.getString(

                VW_CONFIG.STORAGE_KEYS.LAST_CHECK,

                "0"

            )

        );

        const now = Date.now();

        /*
         * Use local cache while it is still fresh.
         * Avoid unnecessary network requests.
         */

        if (

            cachedExpiry > now &&

            (now - lastCheck) <

            VW_CONFIG.SUBSCRIPTION.CHECK_INTERVAL

        ) {

            return {

                active: true,

                uniqueId,

                expires: cachedExpiry

            };

        }

        const url =

            `${VW_CONFIG.SUBSCRIPTION.R2_URL}/${uniqueId}.json`;

        try {

            const response = await fetch(

                url,

                {

                    method: "GET",

                    cache: "no-store"

                }

            );

            /*
             * Network reached server but file unavailable.
             * Continue using cached subscription if still valid.
             */

            if (!response.ok) {

                if (cachedExpiry > now) {

                    return {

                        active: true,

                        uniqueId,

                        expires: cachedExpiry

                    };

                }

                return {

                    active: false,

                    uniqueId,

                    expires: null

                };

            }

            const data = await response.json();

            const expires = Number(data.expires || 0);

            const valid =

                data.uniqueId === uniqueId &&

                expires > now &&

                data.active === true;

            if (valid) {

                Storage.setString(

                    VW_CONFIG.STORAGE_KEYS.EXPIRY,

                    String(expires)

                );

                Storage.setString(

                    VW_CONFIG.STORAGE_KEYS.LAST_CHECK,

                    String(now)

                );

            }

            return {

                active: valid,

                uniqueId,

                expires

            };

        }

        catch (error) {

            console.error(

                "Subscription check failed:",

                error

            );

            /*
             * Offline or temporary server problem.
             * Trust local subscription until cached expiry.
             */

            if (cachedExpiry > now) {

                return {

                    active: true,

                    uniqueId,

                    expires: cachedExpiry

                };

            }

            return {

                active: false,

                uniqueId,

                expires: null

            };

        }

    }

};

export default SubscriptionManager;
