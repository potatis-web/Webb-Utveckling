import { browser } from "$app/environment";
import { writable } from "svelte/store";


/* initialize the users to "" if the users has not already been stored */
const search = browser ? window?.localStorage.getItem('search') ?? "" : ""

export const search_store = writable(search)

if (browser) {
        /* https://svelte.dev/tutorial/auto-subscriptions */
        search_store.subscribe((value) => {
                /* on changes to the chats_store, update the localStorage in the browser. */
                window?.localStorage.setItem('search', value);
        })
}