const std = @import("std");

//Funcionamento basico de uma função
//fn nome(a: type, b: type...) -> return type {
//  return result or type
//}
fn add(a: i32, b: i32) i32 {
    return a + b;
}

fn divide(a: f32, b: f32) !f32 {
    if (b == 0) {
        return error.DivisionByZero;
    }
    return a / b;
}
// Struct:
//
const Person = struct {
    name: []const u8,
    age: u8,

    fn introduce(self: Person) void {
        std.debug.print("I am {s}, {d} years old\n", .{ self.name, self.age });
    }
};

pub fn main() !void {
    const constant = 42;
    const variable: i32 = 10;

    std.debug.print("Addition: {d}\n", .{add(constant, variable)});

    //arrays: qualquer tamanho ou tamanho fixo -> [_]f32{1.1} | [n]i32{1} | [3]u8{'a','b','c'}
    const integers = [_]i32{ 10, 11, 12, 13, 14, 15 };
    const numbers = [_]i32{ 1, 2, 3, 4, 5 };

    std.debug.print("Third number: {d}\n", .{numbers[2]});
    std.debug.print("All the integers: {any}\n", .{integers});
    //try serve para tentar realizar uma ação, uso aqui mais para ter o resultado e printar ele.
    const result = try divide(10, 2);
    std.debug.print("Division result: {d}\n", .{result});

    // ------------------------------------------------------
    // TODO não consegui fazer isso funcionar, eu volto pra isso depois

    // Handle division by zero with error catching
    // divide(5, 0) catch |err| {
    //     std.debug.print("Error caught: {}\n", .{err});
    // };

    // const result_with_error = divide(5, 0) catch |err| {
    //     std.debug.print("Error caught: {}\n", .{err});
    //     return 0.0; // Certifique-se de que isso retorna um f32.
    // };

    //std.debug.print("{any}", .{result_with_error});

    //Utilizando o struct definido anteriormente:

    const person = Person{
        .name = "Alice",
        .age = 25,
    };
    person.introduce();

    //veja memory.zig !!!
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    //veja memory.zig !!!

    //iniciando as listas
    var list = std.ArrayList(i32).init(allocator);
    var listaFloat = std.ArrayList(f32).init(allocator);

    try listaFloat.append(10);
    std.debug.print("ListaFloat items: {any}\n", .{listaFloat.items});

    try list.append(42);
    try list.append(100);

    const array = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    const length = array.len;
    std.debug.print("Length of array hello: {d}\n", .{length});

    for (array) |character| {
        std.debug.print("  {c}\n", .{character}); // Using {c} for characters
    }

    const a = [5]u8{ 'h', 'e', 'l', 'l', 'o' };
    const b = [_]u8{ 'w', 'o', 'r', 'l', 'd' };
    std.debug.print("Arrays: {c}, {c}\n", .{ a, b });

    std.debug.print("List items: {any}\n", .{list.items});

    //liberando a memoria de listaFloat e list//
    defer listaFloat.deinit();
    defer list.deinit();
}
