import { ascending, descending, enty } from "./helpers";

// interface User {
//   id: string;
//   age: number;
//   favouriteGame?: string;
// }

// const user1: User = {
//   id: "user-1",
//   age: 20,
//   favouriteGame: "League of Legends",
// };
// const user2: User = { id: "user-2", age: 40, favouriteGame: "Dota 2" };
// const user3: User = { id: "user-3", age: 9 };

// const usersArray = [user1, user2, user3];

// const usersEnty = enty(usersArray, "id");

// console.log(usersEnty.getById("user1", "user-2"));
// console.log(usersEnty.ids);
// console.log(usersEnty.elements);
// console.log(usersEnty.length);
// console.log(usersEnty.sortByElement((a, b) => a.id < b.id).elements);
// console.log(usersEnty.sortById((a, b) => a < b).elements);
// console.log(usersEnty.add({ id: "user-4", age: 8 }).elements);
// console.log(usersEnty.remove("user-5").elements);

// console.log(usersEnty.sortByElement(descending("age")).elements);
// console.log(usersEnty.sortByElement(ascending("age")).elements);

// console.log(usersEnty.add({ id: "user-4", age: 8 }).getById("user-4"))

export default { enty, sorters: { ascending, descending } };
