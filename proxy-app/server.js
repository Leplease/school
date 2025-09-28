const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

// Serve index.html
app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("❌ Please enter a URL");
  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));