// src/_data/works.js
import fs from "fs";
import Papa from "papaparse";
import getAuthors from "./authors.js"; // importujeme funkci, ne rovnou data

export default () => {
  const file = fs.readFileSync("./src/_data/works.csv", "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  let data = parsed.data.filter(row => {
    return row.publish === "TRUE" || row.publish === "true" || !("publish" in row);
  });

  // zavoláme funkci authors.js → dostaneme pole autorů
  const authors = getAuthors();

  data.forEach(row => {
    // ořež všechny hodnoty v řádku
    Object.keys(row).forEach(key => {
      if (typeof row[key] === "string") {
        row[key] = row[key].trim();
      }
    });

    // převedeme tagy na pole
    if (row.tags) {
      row.tags = row.tags.split(",").map(tag => tag.trim());
    }

    // zpracování obrázků
    if (row.image) {
      // rozdělíme podle čárky nebo středníku
      const imgs = row.image.split(/[,;]\s*/).map(img => img.trim());
      row.image = imgs[0];   // první jako hlavní
      row.images = imgs;     // celé pole pro Lightbox
    }

    // složené jméno autora přímo z works.csv (pokud existuje)
    if (row.firstName && row.lastName) {
      row.authorName = `${row.firstName} ${row.lastName}`;
    }

    // napojení autora podle slug
    if (row.authorSlug) {
      const author = authors.find(a => a.slug === row.authorSlug);
      if (author) {
        row.author = author; // celý objekt autora

        // pokud není jméno přímo ve works.csv, vezmeme z authors
        if (!row.authorName) {
          row.authorName = author.firstName && author.lastName
            ? `${author.firstName} ${author.lastName}`
            : author.name;
        }

        // rovnou připravíme URL na stránku autora
        row.authorUrl = `/authors/${author.slug}/`;
      }
    }
  });

  console.log(`✅ Works.js: načteno ${data.length} záznamů z works.csv`);

  return data;
};
