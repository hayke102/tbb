import { TB_URL } from "./consts";

const UID_COOKKIE = "uid";
export class Auth {
    static auth: string = "";

    static async init() {
        return new Promise((resolve) => {
            chrome.cookies.get(
                { url: TB_URL, name: UID_COOKKIE },
                async (cookie) => {
                    if (cookie && cookie?.value) {
                        Auth.auth = cookie.value;
                        resolve(true);
                    }
                }
            );
        });
    }
}
