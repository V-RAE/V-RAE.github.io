import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

test("the production build contains the V-RAE homepage and animated case studies", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /V-RAE/);
  assert.match(html, /Rethinking Video Latent Spaces for Generation/);

  const assetDirectory = new URL("../dist/assets/", import.meta.url);
  const assetNames = await readdir(assetDirectory);
  const scriptNames = assetNames.filter((name) => name.endsWith(".js"));
  const scripts = await Promise.all(
    scriptNames.map((name) => readFile(new URL(name, assetDirectory), "utf8")),
  );
  const bundledSource = scripts.join("\n");

  assert.match(bundledSource, /video-reconstruction-comparison\.gif/);
  assert.match(bundledSource, /class-conditional-video-generation-k600\.gif/);
  assert.match(bundledSource, /class-conditional-video-generation-ucf101\.gif/);
  assert.match(bundledSource, /world-model-future-prediction\.gif/);
});
