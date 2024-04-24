import express, { Request, Response } from "express";
const app = express();

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
}

let listings: Listing[] = [];

app.use(express.json());

app.post("/listings", (req: Request, res: Response) => {
  const body = req.body;
  if (!body.id || !body.title || !body.description || !body.price) {
    return res
      .status(400)
      .json({ error: "You should pass the correct data to create a listing" });
  }

  const { id, title, description, price } = body;

  listings.push({ id, title, description, price });

  return res.json({ message: "Listing created sucessfully" });
});

app.get("/listings", (_, res: Response) => {
  return res.json({ listings });
});

app.delete("/listings/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const listingsFiltered = listings.filter((listing) => listing.id !== id);

  listings = listingsFiltered;

  return res.json({ message: "Listing deleted sucessfully" });
});

export { app };
