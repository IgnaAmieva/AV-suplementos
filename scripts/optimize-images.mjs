/**
 * Image optimization script for A&V Suplementos
 *
 * - Resizes product images to max 800px wide, hero/combo to max 1000px
 * - Converts to WebP at quality 75
 * - Moves originals to _originals/ (outside public)
 * - Replaces references in code if extension changed
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat, mkdir, copyFile, writeFile, readFile } from "fs/promises";
import { join, extname, basename, relative, dirname } from "path";
import { existsSync } from "fs";

const PUBLIC = "public/images";
const BACKUP = "_originals/images";
const HERO_DIRS = new Set(["hero", "combos"]);
const SKIP_DIRS = new Set(["NDSocial"]); // logos, keep as-is
const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".webp"]);

let totalBefore = 0;
let totalAfter = 0;
let filesProcessed = 0;
let filesSkipped = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function processImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!SUPPORTED.has(ext)) {
    filesSkipped++;
    return null;
  }

  const relPath = relative(PUBLIC, filePath);
  const dirName = relPath.split(/[\\/]/)[0];

  if (SKIP_DIRS.has(dirName)) {
    filesSkipped++;
    return null;
  }

  const maxWidth = HERO_DIRS.has(dirName) ? 1000 : 800;
  const fileStat = await stat(filePath);
  totalBefore += fileStat.size;

  // Backup original
  const backupPath = join(BACKUP, relPath);
  const backupDir = dirname(backupPath);
  if (!existsSync(backupDir)) {
    await mkdir(backupDir, { recursive: true });
  }
  await copyFile(filePath, backupPath);

  // Read file into buffer first to avoid lock conflicts
  const inputBuffer = await readFile(filePath);
  const metadata = await sharp(inputBuffer).metadata();

  let pipeline = sharp(inputBuffer);

  // Resize if wider than max
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  // Convert to WebP
  const newExt = ".webp";
  const newName = basename(filePath, ext) + newExt;
  const newPath = join(dirname(filePath), newName);

  const buffer = await pipeline
    .webp({ quality: 75, effort: 4 })
    .toBuffer();

  await writeFile(newPath, buffer);
  totalAfter += buffer.length;
  filesProcessed++;

  // If original was not .webp, delete original (it's backed up)
  if (ext !== ".webp" && newPath !== filePath) {
    const { unlink } = await import("fs/promises");
    await unlink(filePath);
    return { old: `/images/${relPath}`, new: `/images/${relative(PUBLIC, newPath)}` };
  }

  return null;
}

async function updateReferences(renames) {
  if (renames.length === 0) return;

  const srcFiles = await walk(".");
  const codeFiles = srcFiles.filter(
    (f) =>
      (f.endsWith(".tsx") || f.endsWith(".ts")) &&
      !f.includes("node_modules") &&
      !f.includes(".next") &&
      !f.includes("_originals")
  );

  for (const codeFile of codeFiles) {
    let content = await readFile(codeFile, "utf-8");
    let changed = false;

    for (const { old: oldRef, new: newRef } of renames) {
      if (content.includes(oldRef)) {
        content = content.replaceAll(oldRef, newRef);
        changed = true;
        console.log(`  Updated ref in ${codeFile}: ${oldRef} → ${newRef}`);
      }
    }

    if (changed) {
      await writeFile(codeFile, content);
    }
  }
}

async function main() {
  console.log("🔧 Optimizing images...\n");

  const files = await walk(PUBLIC);
  const renames = [];

  for (const file of files) {
    const rename = await processImage(file);
    if (rename) renames.push(rename);
  }

  console.log(`\n✅ Done!`);
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Files skipped:   ${filesSkipped}`);
  console.log(`   Before: ${(totalBefore / 1024).toFixed(0)} KB`);
  console.log(`   After:  ${(totalAfter / 1024).toFixed(0)} KB`);
  console.log(
    `   Saved:  ${((totalBefore - totalAfter) / 1024).toFixed(0)} KB (${(
      ((totalBefore - totalAfter) / totalBefore) *
      100
    ).toFixed(1)}%)`
  );

  if (renames.length > 0) {
    console.log(`\n📝 Updating ${renames.length} code references...`);
    await updateReferences(renames);
    console.log("   Done!");
  }

  console.log(`\n📂 Originals backed up to: ${BACKUP}/`);
}

main().catch(console.error);
