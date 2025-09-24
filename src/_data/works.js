// src/_data/works.js
import fs from "fs";
import Papa from "papaparse";

export default () => {
  const file = fs.readFileSync("./src/_data/works.csv", "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  const data = parsed.data.filter(row => {
    return row.publish === "TRUE" || row.publish === "true" || !("publish" in row);
  });

  // převedeme tagy na pole
  data.forEach(row => {
    if (row.tags) {
      row.tags = row.tags.split(",").map(tag => tag.trim());
    }
  });

  // 🟢 log do konzole při buildu
  console.log(`✅ Works.js: načteno ${data.length} záznamů z works.csv`);

  return data;
};
