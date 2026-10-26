import { test, expect } from "@playwright/test";

test("investment details are correctly stored", async ({ page }) => {
  const name = "Harry";
  const fund = "Quidditch Quest Equities";

  await page.goto("#/gringottsBank");
  await page.locator('select[id="selectedFund"]').selectOption(fund);
  await page.locator('input[id="oneTimeInvestment"]').fill("50000");
  await page.locator('input[id="years"]').fill("35");
  await page.getByRole("button", { name: "Make me an offer" }).click();

  //LEVEL 1
  await expect(page.locator("div.offer-detail")).toBeVisible();

  //LEVEL 2
  await expect(
    page.locator("div.offer-detail").locator("div.your-data"),
  ).toBeVisible();

  //LEVEL 3
  await expect(
    page.locator("div.offer-detail").locator("div.your-data").locator("p.fund"),
  ).toContainText(fund);

  //samostatne
  //1.zadam meno
  await page.locator('[data-test="customer-name"]').fill(name);
  await page.locator('[data-test="create-investment"]').click();
  //2.kliknem na create investment
  //3.overim ze investment sa mi zobrazil v pravom zozname

  const investmentList = page.locator("ul.investment-list");
  await expect(investmentList).toBeVisible();
  await expect(investmentList.locator("li").locator("h4")).toContainText(name);
});

//samostatne: vytiahnite do konstanty nazov fondu a pouzite ho v teste
//const name = "Harry";
