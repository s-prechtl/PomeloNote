import {toast} from "@zerodevx/svelte-toast";
import {capitalizeFirstLetter} from "./PomeloUtils";

/**
 * Creates an error message toast with red background.
 * @param m
 */
export const createErrorToast = (m: string) => {
    toast.push("Error: " + capitalizeFirstLetter(m), {
        theme: {
            '--toastBackground': 'red'
        }
    })
}