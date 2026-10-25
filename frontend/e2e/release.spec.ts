import { test, expect, Page } from "@playwright/test";

async function createMusician(page: Page, label: string) {
  await page.goto("/auth/register");
  await page.getByLabel("نام نمایشی").fill(label);
  await page.getByLabel("ایمیل").fill(`${label}@example.com`);
  await page.getByLabel("رمز عبور").fill("Browser-test-password-123!");
  await page.getByRole("button", { name: "ثبت‌نام و ورود", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/?$/);
  await page.getByRole("link", { name: "ویرایش پروفایل", exact: true }).click();
  await page.getByLabel("نام نمایشی").fill(label);
  await page.getByLabel("شهر", { exact: true }).fill("Isfahan");
  await page.getByLabel("درباره من").fill("Guitar rehearsal");
  await page.getByRole("button", { name: "ذخیره پروفایل", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/?$/);
  await expect(page.getByRole("heading", { name: label, exact: true })).toBeVisible();
}

test("register → profile edit → search → match → collaboration → messages → notifications", async ({ browser }, testInfo) => {
  const suffix = `${Date.now()}${testInfo.project.name}`;
  const nameA = `a${suffix}`;
  const nameB = `b${suffix}`;
  const contextA = await browser.newContext(testInfo.project.use);
  const contextB = await browser.newContext(testInfo.project.use);
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();
  const errors: string[] = [];
  for (const page of [pageA, pageB]) {
    page.on("pageerror", error => errors.push(error.message));
    page.on("requestfailed", request => { if (request.url().includes("/api/")) console.log("API transport failure", request.method(), request.url(), request.failure()?.errorText); });
    page.on("response", response => { if (response.url().includes("/api/") && response.status() >= 300 && response.status() < 400) console.log("API redirect", response.url(), response.status(), response.headers()["location"]); });
  }
  try {
    await createMusician(pageA, nameA);
    await createMusician(pageB, nameB);
    await pageA.goto("/profile/edit");
    await expect(pageA.getByLabel("نام نمایشی")).toHaveValue(nameA);
    await pageA.getByLabel("درباره من").fill("Updated biography");
    await pageA.getByRole("button", { name: "ذخیره پروفایل", exact: true }).click();
    await expect(pageA).toHaveURL(/\/dashboard\/?$/);
    await expect(pageA.getByText("Updated biography", { exact: true })).toBeVisible();
    await pageA.goto("/activity");
    await expect(pageA.getByRole("heading", { name: nameB, exact: true })).toBeVisible();
    await pageA.goto("/musicians");
    await pageA.getByRole("textbox", { name: "جستجوی نوازنده", exact: true }).fill(nameB);
    await pageA.getByRole("textbox", { name: "فیلتر شهر", exact: true }).fill("Isfahan");
    await pageA.getByRole("button", { name: "پیدا کن", exact: true }).click();
    await pageA.getByRole("link").filter({ has: pageA.getByRole("heading", { name: nameB, exact: true }) }).click();
    await expect(pageA).toHaveURL(/\/musicians\/\d+\/?$/);
    await expect(pageA.getByRole("heading", { name: nameB, exact: true })).toBeVisible();
    const profileUrl = pageA.url();
    await pageA.getByRole("link", { name: "درخواست همکاری" }).first().click();
    await pageA.getByLabel("پیام شما").fill(`collaboration-${suffix}`);
    await pageA.getByRole("button", { name: "ارسال درخواست همکاری", exact: true }).click();
    await expect(pageA.getByText("درخواست همکاری با موفقیت ارسال شد.", { exact: false })).toBeVisible();
    await pageB.goto("/collaboration");
    await pageB.getByRole("button", { name: "پذیرش", exact: true }).click();
    await expect(pageB.getByText("accepted", { exact: true })).toBeVisible();
    await pageA.goto(profileUrl);
    await pageA.getByRole("link", { name: "ارسال پیام", exact: true }).click();
    await pageA.getByLabel("پیام جدید").fill(`message-${suffix}`);
    await pageA.getByRole("button", { name: "ارسال پیام", exact: true }).click();
    await expect(pageA.getByText(`message-${suffix}`, { exact: true })).toBeVisible();
    await pageB.goto("/messages");
    await expect(pageB.getByText(`message-${suffix}`, { exact: true })).toBeVisible();
    await pageB.goto("/activity");
    await expect(pageB.getByText("پیام جدید", { exact: true })).toBeVisible();
    await pageB.getByRole("button", { name: "خواندم", exact: true }).first().click();
    expect(errors).toEqual([]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
  await Promise.allSettled([contextA.close(), contextB.close()]);
});
