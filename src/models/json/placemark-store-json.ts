import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { PlacemarkStore } from "../store.js"; 
import { Placemark } from "../placemark.js";

export const placemarkStoreJson: PlacemarkStore = {

    async getAll(): Promise<Placemark[]> {
        await db.read();
        return db.data.placemarks;
    },

    async getById(id: string): Promise<Placemark | undefined> {
        await db.read();
        return db.data.placemarks.find(p => p._id === id);
    },

    async add(placemark: Omit<Placemark, "_id">): Promise<Placemark> {
        await db.read();
        const newPlacemark: Placemark = {
            _id: v4(),
            name: placemark.name,
            description: placemark.description,
            latitude: placemark.latitude,
            longitude: placemark.longitude
        };
        db.data.placemarks.push(newPlacemark);
        await db.write();
        return newPlacemark;
    },

    async update(placemark: Placemark): Promise<Placemark | undefined> {
        await db.read();
        const index = db.data.placemarks.findIndex(p => p._id === placemark._id);
        if (index !== -1) {
            db.data.placemarks[index] = placemark;
            await db.write();
            return placemark;
        }
        return undefined;
    },

    async deleteById(id: string): Promise<void> {
        await db.read();
        db.data.placemarks = db.data.placemarks.filter(p => p._id !== id);
        await db.write();
    }

}

