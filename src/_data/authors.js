// src/_data/authors.js
import fs from "fs";
import Papa from "papaparse";

export default () => {
  const file = fs.readFileSync("./src/_data/authors.csv", "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  // filtrovat jen publish=TRUE, stejně jako u works
  const data = parsed.data.filter(row => {
    return row.publish === "TRUE" || row.publish === "true" || !("publish" in row);
  });

  // doplníme jméno (firstName + lastName)
  data.forEach(row => {
    if (row.firstName && row.lastName) {
      row.name = `${row.firstName} ${row.lastName}`;
    }

       // složíme dynamicky pole odkazů
    row.links = [];

    if (row.authorsWeb) {
      row.links.push({ url: row.authorsWeb, label: "Web" });
    }
    if (row.artlistcz) {
      row.links.push({ url: row.artlistcz, label: "Artlist.cz" });
    }
    if (row.artmap) {
      row.links.push({ url: row.artmap, label: "Artmap.cz" });
    }
    if (row.wikipedie) {
      row.links.push({ url: row.wikipedie, label: "Wikipedie" });
    }
    if (row.facebook) {
      row.links.push({ url: row.facebook, label: "Facebook" });
    }
    if (row.instagram) {
      row.links.push({ url: row.instagram, label: "Instagram" });
    }
  });
 

  console.log(`✅ Authors.js: načteno ${data.length} záznamů z authors.csv`);

  return data; // ← tady se vrací pole autorů
};
