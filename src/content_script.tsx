// import { sleep } from "./utils";

// chrome.extension.sendRequest("getUid", function (response: string) {
//     alert("response:" + response);
// });

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//     if (msg.color) {
//         console.log("Receive color = " + msg.color);
//         document.body.style.backgroundColor = msg.color;
//         sendResponse("Change color to " + msg.color);
//     } else {
//         sendResponse("Color message is none.");
//     }
// });
// const readme = document.getElementById("readme");
// if (readme) {
//     readme.style.backgroundColor = "green";
// }

// setTimeout(async () => {
//     for (let index = 0; index < 1; index++) {
//         const div = await waitFor(() =>
//             findElementWithPartialClass(
//                 "div",
//                 "styled__TransactionTableWrapper"
//             )
//         );

//         if (div) {
//             const transactionRows = div.firstElementChild!.children[1].children;
//             for (const row of transactionRows) {
//                 const btnContainer = await waitFor(() =>
//                     findElementWithPartialClass("div", "SideMenu__Wrapper", row)
//                 );
//                 console.log(`btnContainer`, btnContainer);
//                 const btn = findElementWithPartialClass(
//                     "button",
//                     "Button-sc",
//                     btnContainer
//                 ) as HTMLButtonElement;
//                 console.log(`btn`, btn);
//                 sleep(1000);
//                 btn.click();
//                 sleep(1000);
//                 debugger;
//             }

//             console.log(transactionRows);
//         }

//         // await nextPage();
//         sleep(500);
//     }
// }, 5000);

// async function nextPage() {
//     const button = await waitFor(() =>
//         findElementWithPartialClass("button", "DateSelection__StyledButton")
//     );

//     (button as HTMLButtonElement).click();
// }

// async function waitFor<T>(callback: () => T | null, max: number | null = null) {
//     const waitTime = 1000 / 30;
//     while (max === null || max > 0) {
//         if (max !== null) {
//             max -= waitTime;
//         }
//         sleep(waitTime);
//         const result = callback();
//         if (result !== null) {
//             return result;
//         }
//     }
// }

// function findElementWithPartialClass(
//     element: string,
//     classStr: string,
//     root: Element | Document = document
// ) {
//     const divs = root.getElementsByTagName(element);
//     for (const div of divs) {
//         if (div.className.includes(classStr)) {
//             return div;
//         }
//     }
// }
