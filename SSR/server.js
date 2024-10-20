import { readFile } from "fs/promises";
import { createServer } from "http";

const PORT = 3000;

async function handleRequest(req, res) {
  const url = req.url;
  // 猫の名前を返すエンドポイント
  if (url === "/api/cat-names") {
    try {
      const catFile = await readFile("./SSR/cats.txt", "utf8");
      const catNames = catFile.split("\n");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ catNames }));
    } catch (error) {
      // Handle file reading errors
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Failed to read cat names.");
    }
  } else if (url === "/") {
    // Respond with HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!doctype html>
        <html>
            <head>
                <link rel="stylesheet" href="../main.css" />
            </head>
            <body>
                <script>
                    async function onClick() {
                        const response = await fetch('/api/cat-names');
                        const json = await response.json();
                        const catNames = json.catNames;
                        const index = Math.floor(Math.random() * catNames.length);
                        const catName = catNames[index];
                        document.body.innerText = catName;
                    }
                </script>
                <button onClick="onClick()">
                    Reveal
                </button>
            </body>
        </html>
    `);
  } else {
    // Handle not found cases
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

// Create the server using the handler
const server = createServer(handleRequest);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
