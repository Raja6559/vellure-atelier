import { test, expect, type Page } from "@playwright/test";
async function open(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Colour", exact: true }),
  ).toBeEnabled({ timeout: 20000 });
}

test("service categories work by keyboard and keep the illustrative label", async ({
  page,
}) => {
  await open(page);
  await expect(
    page.getByRole("heading", { name: "A little pause. A little you." }),
  ).toBeVisible();
  const colour = page.getByRole("button", { name: "Colour", exact: true });
  await colour.focus();
  await page.keyboard.press("Enter");
  await expect(colour).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "Tone Refresh", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Cut & Shape", exact: true }),
  ).toBeHidden();
  await expect(
    page.getByText(
      "An illustrative service edit. No real services, prices or appointments are offered.",
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Styling", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Bridal Style Exploration",
      exact: true,
    }),
  ).toBeVisible();
});

test("appointment preview contains focus, restores it, and collects no data", async ({
  page,
}) => {
  const writes: string[] = [];
  page.on("request", (r) => {
    const url = new URL(r.url());
    const demoOrigin = new URL(
      process.env["DEMO_BASE_URL"] || "http://127.0.0.1:8088",
    ).origin;
    // Cloudflare injects its own performance beacon on the public domain.
    // Keep rejecting every other write, including any application submission.
    const infrastructureBeacon =
      url.origin === demoOrigin && url.pathname === "/cdn-cgi/rum";
    if (!["GET", "HEAD"].includes(r.method()) && !infrastructureBeacon)
      writes.push(r.url());
  });
  await open(page);
  const trigger = page
    .getByRole("button", { name: "Preview an appointment", exact: true })
    .first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("No appointment can be booked here.");
  await expect(dialog.locator("input,textarea,form")).toHaveCount(0);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(writes).toEqual([]);
});

test("mobile navigation follows anchors and returns focus on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  const toggle = page.getByRole("button", {
    name: /^(Open|Close) navigation$/,
  });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
test("gallery preview is labelled and restores its trigger", async ({
  page,
}) => {
  await open(page);
  const trigger = page.getByRole("button", { name: "View The quiet details" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading")).toHaveText("The quiet details");
  await expect(dialog).toContainText("AI-generated concept image");
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
for (const width of [320, 390, 430, 1440])
  test("layout, images and typography at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);
    for (const image of await page.locator("img:visible").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("h1")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: "test-results/vellure-" + width + ".png",
      fullPage: true,
    });
    await page.screenshot({
      path: "test-results/vellure-hero-" + width + ".png",
    });
  });
test("reduced motion shows a static lookbook", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await expect(page.locator("#edit")).not.toHaveClass(/lookbook-enhanced/);
  for (const card of await page.locator(".lookbook-card").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("blocked animation leaves content and controls usable", async ({
  page,
}) => {
  await page.route("**/*gsap*", (route) => route.abort());
  await open(page);
  await expect(page.locator("#edit")).not.toHaveClass(/lookbook-enhanced/);
  await expect(page.locator(".lookbook-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Colour", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Tone Refresh", exact: true }),
  ).toBeVisible();
});
test("desktop choreography cleans up on mobile resize", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await open(page);
  await expect(page.locator("#edit")).toHaveClass(/lookbook-enhanced/);
  await page.locator(".lookbook-card").last().scrollIntoViewIfNeeded();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#edit")).not.toHaveClass(/lookbook-enhanced/);
  for (const image of await page.locator(".lookbook-photo").all())
    expect(await image.evaluate((el) => getComputedStyle(el).transform)).toBe(
      "none",
    );
});
test("concept boundaries, search metadata and unknown routes", async ({
  page,
}) => {
  await open(page);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await expect(
    page
      .getByText("Fictional beauty atelier concept by Krelyvo Studio.", {
        exact: true,
      })
      .first(),
  ).toBeVisible();
  await expect(
    page.locator('form,input,textarea,a[href^="tel:"],a[href*="wa.me"]'),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "View the Krelyvo case study" }),
  ).toHaveAttribute("href", "https://krelyvo.com/work/vellure-atelier");
  const response = await page.goto("/not-an-atelier");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Return to Vellure" }),
  ).toBeVisible();
});
test("server rendering exposes all services without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env["DEMO_BASE_URL"] || "http://127.0.0.1:8088");
  await expect(
    page.getByRole("heading", { name: "A little pause. A little you." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Cut & Shape", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tone Refresh", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Occasion Styling", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#edit")).not.toHaveClass(/lookbook-enhanced/);
  await expect(
    page
      .getByRole("navigation", { name: "Page navigation" })
      .getByRole("link", { name: "Services", exact: true }),
  ).toHaveAttribute("href", "#services");
  await context.close();
});
test("appointment and gallery dialogs fit a narrow short phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await open(page);
  await page
    .getByRole("button", { name: "Preview an appointment", exact: true })
    .first()
    .click();
  let dialog = page.getByRole("dialog");
  expect(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
    true,
  );
  await dialog.getByRole("button", { name: "Back to the atelier" }).click();
  await page
    .getByRole("button", { name: "View The atelier", exact: true })
    .click();
  dialog = page.getByRole("dialog");
  expect(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
    true,
  );
  await expect(
    dialog.getByRole("button", { name: "Close image preview" }),
  ).toBeInViewport();
  await page.keyboard.press("Escape");
});
