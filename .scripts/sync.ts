import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const checkOnly = process.argv.includes("--check");
let failedChecks = false;

const root = join(import.meta.dirname, "..");
const mastersDir = join(import.meta.dirname, "masters");
const sharedPackagePartial = join(
  import.meta.dirname,
  "partials",
  "package.shared.json",
);

const templates = ["app", "lib"];

async function syncMasters() {
  const masters = await readdir(mastersDir);

  for (const master of masters) {
    const masterFile = join(mastersDir, master);

    for (const template of templates) {
      const templateDir = join(root, template);
      const templateFile = join(templateDir, master);

      if (checkOnly) {
        const templateContents = await readFile(templateFile, "utf8");
        const masterContents = await readFile(masterFile, "utf8");
        if (templateContents === masterContents) {
          console.log(`${master} matches ${template}/${master}.json`);
        } else {
          failedChecks = true;
          console.error(`${master} does not match ${template}/${master}.json`);
        }
      } else {
        await copyFile(masterFile, templateFile);
        console.log(`Synchronized ${master}`);
      }
    }
  }
}

function mergeProperties(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
) {
  for (const [key, value] of Object.entries(source)) {
    target[key] = value;
  }
}

async function syncSharedPackagePartial() {
  const sharedPackageContents = await readFile(sharedPackagePartial, "utf8");
  const sharedPackage = JSON.parse(sharedPackageContents);

  for (const template of templates) {
    const templatePackagePath = join(root, template, "package.json");
    const templatePackageContents = await readFile(templatePackagePath, "utf8");
    const templatePackage = JSON.parse(templatePackageContents);

    mergeProperties(templatePackage.scripts, sharedPackage.scripts);
    mergeProperties(
      templatePackage["lint-staged"],
      sharedPackage["lint-staged"],
    );
    mergeProperties(templatePackage.prettier, sharedPackage.prettier);
    mergeProperties(
      templatePackage.devDependencies,
      sharedPackage.devDependencies,
    );

    const json = JSON.stringify(templatePackage, null, 2);
    const contents = `${json}\n`;

    if (checkOnly) {
      if (contents === templatePackageContents) {
        console.log(`package.json matches ${template}/package.json`);
      } else {
        failedChecks = true;
        console.error(`package.json does not match ${template}/package.json`);
      }
    } else {
      await writeFile(templatePackagePath, contents);
      console.log(`Synchronized ${template}/package.json`);
    }
  }
}

await syncMasters();
await syncSharedPackagePartial();
