import { test, expect } from "@playwright/test";

test("house and message are displayed on sort me click", async ({ page }) => {
  await page.goto("#/sortingHat");
  await page.getByRole("button", { name: "Sort me" }).click();

  const response = await page.waitForResponse("**/sortingHat");

  //overim odpoved
  expect(response.status()).toEqual(200);
  const body = await response.json();
  expect(body.house).toBeTruthy();
  expect(body.sortingHatSays).toBeTruthy();

  //overim zobrazenie na stranke
  const resultMessage = page.locator('[data-test="result-message"]');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toHaveText(body.sortingHatSays);

  const resultHouse = page.locator('[data-test="house-result"]');
  await expect(resultHouse).toBeVisible();
  await expect(resultHouse).toHaveText(body.house);
});

//JSON - Javascript Object Notation
test("objects", () => {
  const student = {
    name: "Harry",
    surname: "Potter",
    age: 11,
    house: "Gryffindor",
  };

  console.log(student);
  console.log(student.surname);
});

// BASE_URL: https://potterapi-tgq2.onrender.com ENDPOINT: /sortingHat
