import parse, {
    Node as PNode,
    HTMLElement as PHTMLElement,
} from "node-html-parser";
import { Order } from "../models";
import { getHistoryPage, getOrderPage } from "./scraperApi";

type CommonNode = Node | PNode;
type CommonHTMLElement = HTMLElement | PHTMLElement;

const HISTORY_DAYS = 10;

export async function scrapeHistory() {
    let allOrders: Order[] = [];
    for (let index = 1; index <= HISTORY_DAYS; index++) {
        const page = await getHistoryPage(index);

        const orders = await parseHistoryPage(page);
        allOrders = allOrders.concat(orders);
    }
    console.log(`allOrders`, allOrders);
    return allOrders;
}

async function parseHistoryPage(page: any) {
    const orders: Order[] = [];
    for (const order of page.Data.orderList) {
        // TODO: timestamp...
        const root = parse(await getOrderPage(order.orderId));
        const orderDate = parseOrderDate(root);
        const restaurant = parseRestaurant(root);
        if (!restaurant || !orderDate) {
            // slipping order, can not resolve some parameters
            continue;
        }
        const parsedOrders = parseOrders(root);
        orders.push(
            ...parsedOrders.map((item) => ({ ...item, restaurant, orderDate }))
        );
    }

    return orders;
}

function parseOrders(parsedRoot: CommonHTMLElement) {
    const ordersTable = parsedRoot.querySelector(".MainTable");
    if (ordersTable) {
        const tableBody = ordersTable.querySelector("tbody");
        if (tableBody) {
            const tableRows = tableBody.childNodes;
            const orderRows = [...tableRows].filter(
                (item, index) => index % 2 === 1 && item.childNodes.length > 2
            );
            return orderRows.map((itemRow) => {
                return parseRow(itemRow);
            });
        }
    }
    return [];
}

function parseRow(itemRow: CommonNode) {
    const [
        amountC,
        dishC,
        priceC,
    ] = (itemRow.childNodes as any) as HTMLElement[];
    const [
        dish,
        dishDescription,
        _dishChangesHeader,
        dishChanges,
    ] = dishC.querySelectorAll("span");
    const [, price] = priceC.querySelector("span")!.childNodes!;
    const [category, dishName] = dish.innerText
        .split(":")
        .map((section) => section.split("*").join("").trim());
    // console.log(`dish ${dishName} cat: ${category} price: ${price}`);
    return {
        dishName,
        category,
        price: price.textContent || "",
    };
}
function parseRestaurant(root: CommonHTMLElement) {
    const restaurantTable = root.querySelector(".ResInfoTable");
    if (restaurantTable) {
        return restaurantTable.querySelectorAll("td[align='right']")[1]
            .textContent;
    }
}
function parseOrderDate(root: CommonHTMLElement) {
    return root.querySelector("#orderTime")?.textContent;
}
