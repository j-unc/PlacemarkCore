import { UserStore } from "./store.js";
import { userStoreJson } from "./json/user-store-json.js";
import { PlacemarkStore } from "./store.js";
import { placemarkStoreJson } from "./json/placemark-store-json.js";

export const db = {
    userStore: null as UserStore | null,
    placemarkStore: null as PlacemarkStore | null,

    async init(): Promise<void> {
        this.userStore = userStoreJson as UserStore;
        this.placemarkStore = placemarkStoreJson as PlacemarkStore;
    }
};