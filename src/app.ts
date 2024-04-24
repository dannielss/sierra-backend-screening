import express from "express";
const app = express();
const PORT = 8080;

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
}

app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
