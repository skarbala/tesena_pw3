import { test, expect } from "@playwright/test";

test("investment details are correctly stored", async ({ page }) => {
  await page.goto("#/gringottsBank");
  //1. zvolim fund
  await page
    .locator('select[id="selectedFund"]')
    .selectOption("Quidditch Quest Equities");
  //page.locator('[id="selectedFund"]');
  await page.locator('input[id="oneTimeInvestment"]').fill("50000");
  await page.locator('input[id="years"]').fill("35");

  await page.getByRole("button", { name: "Make me an offer" }).click();

  //skuste sami, ukazeme si riesenie spolu :)
  //5. overim ze offer obsahuje spravny nazov fondu
});
