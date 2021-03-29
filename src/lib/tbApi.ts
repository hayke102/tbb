import { Auth } from "./auth";

export async function sendRequest(method: string, url: string, data?: object) {
    const myHeaders = new Headers();
    myHeaders.append("accept", " application/json, text/plain, */*");
    myHeaders.append("accept-encoding", " gzip, deflate, br");
    myHeaders.append(
        "user-agent",
        " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
    );
    myHeaders.append("user-token", Auth.auth);
    myHeaders.append("Content-Type", "application/json");

    const body = data ? { body: JSON.stringify(data) } : {};
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        ...body,
    };

    const request = await fetch(url, requestOptions);
    return await request.json();
}
