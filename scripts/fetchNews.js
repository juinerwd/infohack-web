// scripts/fetchNews.js
import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const parser = new Parser();

// 📰 Fuentes RSS verificadas
const feeds = [
    { url: "https://www.welivesecurity.com/la-es/feed/", lang: "es" },
    { url: "https://krebsonsecurity.com/feed/", lang: "es" },
    { url: "https://feeds.feedburner.com/TheHackersNews", lang: "es" },
    { url: "https://www.securityweek.com/feed/", lang: "es" },
];

// 📂 Ruta donde se guardarán las noticias
const outputDir = path.resolve("src/content/news");

// 🧠 Función principal
async function fetchNews() {
    console.log("🛰️  Iniciando descarga de noticias...");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const { url, lang } of feeds) {
        try {
            const feed = await parser.parseURL(url);

            for (const item of feed.items.slice(0, 3)) {
                const titleSlug = item.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
                    .slice(0, 60);

                const filePath = path.join(outputDir, `${titleSlug}.md`);

                // Si ya existe, no lo vuelve a crear
                if (fs.existsSync(filePath)) continue;

                const markdown = `---
title: "${item.title.replace(/"/g, '\\"')}"
description: "${(item.contentSnippet || "").replace(/"/g, '\\"')}"
author: "${feed.title || "Fuente externa"}"
publishDate: "${item.isoDate || new Date().toISOString()}"
tags: ["noticia", "ciberseguridad"]
category: "Noticias"
language: "${lang}"
source: "${item.link}"
---

${item.contentSnippet || "Sin descripción disponible."}

👉 [Leer noticia completa](${item.link})
`;

                fs.writeFileSync(filePath, markdown, "utf-8");
                console.log(`✅ Guardada: ${item.title}`);
            }
        } catch (err) {
            console.error(`❌ Error al procesar ${url}:`, err.message);
        }
    }

    console.log("🎉 Noticias actualizadas correctamente.");
}

fetchNews();
