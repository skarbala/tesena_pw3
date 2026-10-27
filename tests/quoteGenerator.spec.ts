import { test, expect } from "@playwright/test";

test.beforeEach("open page", async ({ page }) => {
  await page.goto("#/quotes");
});

test("display quote on button click", async ({ page }) => {
  await page.getByRole("button", { name: "Get Quote" }).click();
  await expect(page.locator("ul.quote-lis").locator("li")).toBeVisible();
});

test("heading should have correct text", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Potter Quotes" }),
  ).toBeVisible();
});

test("remove quote button should be disabled on page open", async ({
  page,
}) => {
  await expect(
    page.getByRole("button", { name: "Remove Quote" }),
  ).toBeDisabled();
});

test("display correct number of wisdom points", async ({ page }) => {
  for (let index = 0; index < 5; index++) {
    await page.getByRole("button", { name: "Get Quote" }).click();
  }
  await expect(page.locator('[data-test="wisdom-points"]')).toHaveText(
    "wisdom points +5",
  );
  await expect(page.locator('[data-test="wisdom-points"]')).toContainText("5");
});

test("empty list message should have correct text", async ({ page }) => {
  await expect(
    page.getByText("Click the button to get some wisdom"),
  ).toBeVisible();

  await expect(page.locator("div.empty-list-message")).toHaveText(
    "Click the button to get some wisdom",
  );
  await expect(page.locator("div.empty-list-message")).toBeVisible();
});
