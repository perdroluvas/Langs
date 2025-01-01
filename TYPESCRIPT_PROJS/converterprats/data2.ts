type User = {
  id: string;
  name: string;
  age: number;
};

function groupById(array: User[]): Record<string, User> {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {} as Record<string, User>);
}

const users: User[] = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

const usersById = groupById(users);

console.log(users);
console.log(usersById);

/*
  // Expected result:
  usersById = {
    john: {id: 'john', name: "John Smith", age: 20},
    ann: {id: 'ann', name: "Ann Smith", age: 24},
    pete: {id: 'pete', name: "Pete Peterson", age: 31},
  }
*/

