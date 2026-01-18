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

    async getByUserId(userId: string): Promise<Placemark[]> {
        await db.read();
        return db.data.placemarks?.filter(p => p.userId === userId) || [];
    },


    async add(placemark: Omit<Placemark, "_id">): Promise<Placemark> {
        await db.read();
        const newPlacemark: Placemark = {
            _id: v4(),
            userId: placemark.userId,
            name: placemark.name,
            description: placemark.description,
            latitude: placemark.latitude,
            longitude: placemark.longitude
        };
        console.log("Adding new placemark:", newPlacemark);
        db.data.placemarks.push(newPlacemark);
        await db.write();
        return newPlacemark;
    },

    async update(poi: Placemark, updatedPoi: Partial<Omit<Placemark, "_id" | "userId">>): Promise<Placemark | undefined> {

        
        poi.name = updatedPoi.name ?? poi.name;
        poi.description = updatedPoi.description ?? poi.description;
        poi.latitude = updatedPoi.latitude ?? poi.latitude;
        poi.longitude = updatedPoi.longitude ?? poi.longitude;

        await db.write();
        return poi;
    },

    async deleteById(id: string): Promise<void> {
        await db.read();
        db.data.placemarks = db.data.placemarks.filter(p => p._id !== id);
        await db.write();
    }

}

