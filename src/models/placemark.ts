export interface Placemark {
    _id: string;
    userId: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    // ToDo: categories and images
}