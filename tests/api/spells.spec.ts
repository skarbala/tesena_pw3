import { test, expect, request } from "@playwright/test";

// http://localhost:3000/spells
test("GET returns all spells", async ({ request }) => {
  const response = await request.get("http://localhost:3000/spells");
  //overim ze odpoved ma status 200
  //expect(response.status()).toEqual(200);
  expect(response.ok(), `Real status was ${response.status()}`).toEqual(true);
  const body = await response.json();
  //overim ze v odpovedi je aspon jedno kuzlo
  expect(body).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  body.forEach((object) => {
    expect(object.spell).toBeTruthy();
    expect(object.effect).toBeTruthy();
  });
});

test("GET spells return only unforgivable spells", async ({ request }) => {
  //1. zavolajte GET request s query parametrom ?isUnforgivable=true
  //2. ulozte si odpoved
  //3. overte ze sa vratie presne 3 kuzla
  //4. pre kazde kuzlo overte, ze isUnforgivable == true
  const response = await request.get("http://localhost:3000/spells", {
    params: {
      isUnforgivable: true,
    },
  });
  const body = await response.json();
  expect(response.ok()).toBe(true);
  expect(body.length).toEqual(3);

  body.forEach((object) => {
    expect(object.isUnforgivable).toEqual(true);
  });
});
