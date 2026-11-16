import { parseArgs } from "node:util";
import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({ options: { slug: { type: "string" }, title: { type: "string" }, kind: { type: "string", default: "article" }, language: { type: "string", default: "en" }, "dry-run": { type: "boolean", default: false } } });
if (!values.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug) || !values.title?.trim() || !["article", "note", "resource"].includes(values.kind) || !["en", "es"].includes(values.language)) {
  throw new Error('Use --slug lowercase-slug --title "Title" [--kind article|note|resource] [--language en|es] [--dry-run]');
}
const entry = { slug: values.slug, status: "draft", kind: values.kind, language: values.language, title: values.title, summary: { en: values.title, es: values.title }, writtenAt: new Intl.DateTimeFormat("en-CA", { timeZone: "America/Halifax", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()), topics: [], blocks: [{ type: "paragraph", text: "Start your draft here." }], references: [] };
if (values["dry-run"]) {
  process.stdout.write(JSON.stringify(entry, null, 2) + "\n");
} else {
  const target = path.join(root, "content/journal", `${values.slug}.json`);
  try { await access(target); throw new Error(`Entry already exists: ${values.slug}`); } catch (error) { if (error.code !== "ENOENT") throw error; }
  const registry = path.join(root, "src/data/journal.ts");
  const source = await readFile(registry, "utf8");
  const marker = "export const journalEntries = [";
  if (!source.includes(marker)) throw new Error("Registry changed; register the entry manually.");
  const variable = "entry_" + values.slug.replaceAll("-", "_");
  const updated = `import ${variable} from "../../content/journal/${values.slug}.json";\n` + source.replace(marker, marker + variable + ", ");
  await writeFile(target, JSON.stringify(entry, null, 2) + "\n", { flag: "wx" });
  await writeFile(registry, updated);
  process.stdout.write(`Created draft: content/journal/${values.slug}.json\n`);
}
