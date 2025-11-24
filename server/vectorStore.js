import fs from "fs/promises";
import { pipeline } from "@xenova/transformers";
import { get } from "https";


// Load embedding model once (cached locally after first download)
let embedder;
async function getEmbedder() {
    if (!embedder) {
        embedder = await pipeline("feature-extraction", "Xenova/allMiniLM-L6-v2");
    }
    return embedder;
}

async function embed(text) {
    const model = await getEmbedder();
    const output = await model(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
}


export async function buildVectors() {
    console.log("Loading site_docs.json...");
    const docs = JSON.parse(await fs.readFile("site_docs.json", "utf8"));

    let vectors = [];
    console.log("Embedding", docs.length, "documents...");

    for (const doc in docs) {

        const vector = await embed(docs.text);

        vectors.push({
            url: doc.url,
            text: doc.text,
            embedding: vector
        });

        console.log("Embedded:", doc.url);
    }

    console.log("saving vectors.json...");
    await fs.writeFile("vectors.json", JSON.stringify(vectors, null, 2));
    console.log("DONE");
}

function cosine(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
    return sum;
}

let cachedVectors = null;

export async function search(query, topK = 5) {
    
    if(!cachedVectors) {
        cachedVectors = JSON.parse(fs.readFileSync("vectors.json", "utf8"));
    }
    
    const qVec = await embed(query);

    const scored = cachedVectors.map(
        v => ({
            ...v,
            score: cosine(qVec, v.embedding)
        }))
        .sort((a, b) = b.score - a.score)
        .slice(0, topK);


    return scored;
}



