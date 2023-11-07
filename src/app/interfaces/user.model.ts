import { UploadResult } from "firebase/storage";

export interface User {
    uid: string;
    id: string;
    email: string;
    password: string;
    name: string;
    imagen: string | UploadResult
}