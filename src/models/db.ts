import { UserStore } from "./store.js";
import { userStoreJson } from "./json/user-store-json.js";

export const db = {
    userStore: null as UserStore | null,

    async init(): Promise<void> {
        this.userStore = userStoreJson as UserStore;
    }
};