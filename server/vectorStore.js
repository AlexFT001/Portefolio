import fs from "fs"
import cosineSimilarity from "cosine-similarity";

function embed(text) {
    return text.split("").map(c => c.charCodeAt(0));
}

const docs = JSON.parse(fs.readFileSync("site_docs.json"));

const vectors = docs.map( doc => ({
    ...doc,
    embedding: embed(doc.text)
}));

fs.writeFileSync("vectors.json", JSON.stringify(vectors,null,2));
console.log("Vectors saved");

export function search(query, topK = 3){
    const qVec = embed(query);
    const results = vectors
        .map(doc => ({ ...doc, score: cosineSimilarity(qVec, doc.embedding) }))
        .sort((a,b) => b.score - a.score)
        .slice(0, topK);
    
    console.log("Search results for:", query);
    results.forEach(r => console.log(r.url, r.score));
    return results;

}