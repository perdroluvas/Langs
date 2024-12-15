import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    // Write to the file "hello.txt"
    await Bun.write(Bun.file("./hello.txt"), "Oiiii");

    // Generate ASCII art using figlet
    const body = figlet.textSync("Bun!");

    // Return the generated text as the response
    return new Response(body, { headers: { "Content-Type": "text/plain" } });
  },
});

console.log("Server is running on http://localhost:3000");

