export const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

// export const getChildren = (element: ) => {
//     // if (element && element.firstChild && element.firstChild.parentElement) {
//     //     const children = element.firstChild.parentElement.children;
//     //     const result: any = [];
//     //     for (let index = 0; index < children.length; index++) {
//     //         result.push(children[index]);
//     //     }
//     //     return result;
//     // }
//     return [];
// };
