import { STORAGE_KEY_PREFIX } from "../consts";
import { Order } from "../models";

type StoredData = {
    orders: Order[];
    lastUpdate: string;
};

const ORDERS_KEY = STORAGE_KEY_PREFIX + "orders";

export function storeOrders(orders: Order[]) {
    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify({
            orders,
            lastUpdate: Date.now(),
        })
    );
}

export function getStoredOrders(): StoredData {
    const rawItem = localStorage.getItem(ORDERS_KEY);
    if (rawItem) {
        return JSON.parse(rawItem);
    }
    return {
        lastUpdate: "1/1/1970",
        orders: [],
    };
}
