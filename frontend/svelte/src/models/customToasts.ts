import {toast} from "@zerodevx/svelte-toast";
import {capitalizeFirstLetter} from "./PomeloUtils";

export const createErrorToast = (m: string) => {
    toast.push("Error: " + capitalizeFirstLetter(m), {
        theme: {
            '--toastBackground': 'red'
        }
    })
}