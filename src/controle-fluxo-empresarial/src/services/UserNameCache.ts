import { UserApi } from "../apis/Pessoas/UserApi";
import UserModel from "../models/Pessoas/UserModel";

const USER_NAME_CACHE = "USER_NAME_CACHE";
var userData: UserModel[] = []

export async function getUserNameStorage(id: string) {

    if(!id){
        return "";
    }

    if (userData.length! <= 1) {
        userData = JSON.parse(localStorage.getItem(USER_NAME_CACHE)!) ?? []
    }

    let user = userData.find(e => e.id === id);
    let userName = user?.name! ?? user?.userName;

    if (!userName) {
        let request = (await UserApi.GetById(id)).data;
        userName = request.name! ?? request.userName!

        if (userName) {
            userData.push(request);
            localStorage.setItem(USER_NAME_CACHE, JSON.stringify(userData));
        }
    }

    return userName;
}