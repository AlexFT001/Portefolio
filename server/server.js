import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.get("/chatQuim", async (req, res) => {
  try {
    const prompt = req.query.prompt;

    res.setHeader("Content-Type",  "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "portefolioChat",
        prompt
      })
    });

    const stream = response.body;

    stream.on("data", (chunk) => {
      const str = chunk.toString();
      str.split("\n").forEach(line => {
        if (line.trim()) {
          const json = JSON.parse(line);
          res.write(`data: ${json.response}\n\n`);
        }
      });
    });

    stream.on("end", () => {
      res.write("event: done\ndata: \n\n");
      res.end();
    });

    stream.on("error", (err) => {
      console.error(err);
      res.end();
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error calling Ollama");
  }
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
