import { TB_URL } from "../consts";
import { sendRequest } from "../tbApi";

export async function getOrderPage(orderId: number) {
    // TODO timestamp
    return await sendRequest(
        "GET",
        `${TB_URL}/Account/GetSingleOrderViewInfo?culture=he-IL&uiCulture=he&timestamp=1616692909368&orderId=${orderId}`
    );
}

export async function getHistoryPage(pageNum: number) {
    return await sendRequest(
        "POST",
        `${TB_URL}/NextApi/UserTransactionsReport`,
        {
            Culture: "he-IL",
            UiCulture: "he",
            DateBias: `-${pageNum}`,
        }
    );
}
