// @ts-ignore - This package does not have type definitions and should not be
// declared with a .d.ts file since it would be included in the final package
import * as tmicon from "@trendmicro/tmicon";
import path from "path";
import fs from "fs";

const outFile = path.resolve("index.d.ts");

function kebabCaseToPascalCase(str: string) {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}


const iconDefinitions = (tmicon as { icons: Array<{ name: string }> }).icons.reduce((acc, { name }) => {
  return {
    ...acc,
    [name]: {
      name: `${kebabCaseToPascalCase(name)}Icon`,
    },
  };
}, {} as Record<string, { name: string }>);

const base = fs.readFileSync(path.resolve(path.join("scripts", "generate-definitions", "base.d.ts.template")), "utf-8");
const iconTemplate = fs.readFileSync(path.resolve(path.join("scripts", "generate-definitions", "icon.d.ts.template")), "utf-8");

const icons = Object.keys(iconDefinitions).map((icon) => (
  iconTemplate.replace(/__ICON__/g, iconDefinitions[icon].name))
).join("\n");

// clean previous file
try {
  fs.unlinkSync(outFile);
} catch {}

fs.writeFileSync(outFile, `
// This file is auto-generated by scripts/generate-definitions
// Do not modify this file manually
${base}

${icons}
`.trimStart());