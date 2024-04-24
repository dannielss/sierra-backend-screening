import request from "supertest";
import { app } from "./app";

describe("#Test app", () => {
  it("should create a listing", (done) => {
    request(app)
      .post("/listings")
      .send({
        id: "123",
        title: "Test",
        description: "My listing",
        price: 100,
      })
      .set("Accept", "application/json")
      .expect(
        200,
        {
          message: "Listing created sucessfully",
        },
        done
      );
  });

  it("should return an error and status 400 if the data passed is incorrect", (done) => {
    request(app)
      .post("/listings")
      .send({
        id: "123",
        title: "Test",
        description: "My listing",
      })
      .set("Accept", "application/json")
      .expect(
        400,
        {
          error: "You should pass the correct data to create a listing",
        },
        done
      );
  });

  it("should return all listings", async () => {
    const response = await request(app)
      .get("/listings")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.listings.length).toBe(1);
    expect(response.body.listings[0]).toStrictEqual({
      id: "123",
      title: "Test",
      description: "My listing",
      price: 100,
    });
  });

  it("should delete a listing", async () => {
    const response = await request(app).del("/listings/123");

    expect(response.body).toStrictEqual({
      message: "Listing deleted sucessfully",
    });

    const listings = await request(app)
      .get("/listings")
      .set("Accept", "application/json");

    expect(listings.body.listings).toStrictEqual([]);
  });
});
