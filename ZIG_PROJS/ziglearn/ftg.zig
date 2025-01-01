const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Get arguments
    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    if (args.len != 2) {
        std.debug.print("Usage: {s} <directory_path>\n", .{args[0]});
        return;
    }

    const path = args[1];
    try printFileTree(allocator, path, 0);
}

fn printFileTree(allocator: std.mem.Allocator, path: []const u8, depth: usize) !void {
    var dir = try std.fs.openDirAbsolute(path, .{ .iterate = true });
    defer dir.close();

    var it = dir.iterate();
    while (try it.next()) |entry| {
        // Print indentation
        for (0..depth) |_| {
            std.debug.print("│   ", .{});
        }

        switch (entry.kind) {
            .file => {
                std.debug.print("├── {s}\n", .{entry.name});
            },
            .directory => {
                std.debug.print("├── {s}/\n", .{entry.name});
                const new_path = try std.fs.path.join(allocator, &[_][]const u8{ path, entry.name });
                defer allocator.free(new_path);
                try printFileTree(allocator, new_path, depth + 1);
            },
            else => {
                std.debug.print("├── {s} (special)\n", .{entry.name});
            },
        }
    }
}
