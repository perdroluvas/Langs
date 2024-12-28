const std = @import("std");

pub fn main() !void {
    const numbers = [_]i32{ 1, 2, 3, 4, 5 };

    // Method 1: Using {any} format specifier
    std.debug.print("Method 1 - {any}\n", .{numbers});

    // Method 2: Using a for loop
    std.debug.print("Method 2 - [", .{});
    for (numbers, 0..) |num, i| {
        if (i > 0) std.debug.print(", ", .{});
        std.debug.print("{d}", .{num});
    }
    std.debug.print("]\n", .{});

    // Method 3: Using {d} with array items
    std.debug.print("Method 3 - [{d}, {d}, {d}, {d}, {d}]\n", .{ numbers[0], numbers[1], numbers[2], numbers[3], numbers[4] });

    // Method 4: Print each element on a new line
    std.debug.print("Method 4 - Array elements:\n", .{});
    for (numbers) |num| {
        std.debug.print("  {d}\n", .{num});
    }

    // Method 5: Using writer interface
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Method 5 - {any}\n", .{numbers});
}
