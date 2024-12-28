const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const array = try allocator.alloc(u8, 10); // Allocate an array of 10 bytes
    defer allocator.free(array); // Free the memory when done

    // Use the array...
    array[0] = 42;
    std.debug.print("Array[0] = {}\n", .{array[0]});
}
