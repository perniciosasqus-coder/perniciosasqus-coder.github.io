// Chiffre le site en clair (content/site) vers dist/ : AES-256-GCM, clé dérivée par PBKDF2-SHA256.
// Usage : COMPENDIUM_MDP='...' node scripts/build-content.mjs
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto";
import cfg from "../site.config.mjs";
const mdp = process.env.COMPENDIUM_MDP;
if (!mdp || mdp.length < 12) { console.error("COMPENDIUM_MDP manquant ou trop court (12 caractères minimum)."); process.exit(1); }
const src = cfg.contenu, out = cfg.sortie;
const raw = crypto.pbkdf2Sync(mdp, Buffer.from(cfg.sel, "base64"), cfg.iterations, 32, "sha256");
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(path.join(out, "f"), { recursive: true });
const man = JSON.parse(fs.readFileSync(path.join(src, "manifest.json"), "utf8"));
const liste = [{ name: "index.html", type: "text/html", shell: true }, { name: "style.css", type: "text/css" }].concat(man.map(n => ({ name: n, type: "text/javascript" })));
const files = liste.map((f, i) => {
  const plain = fs.readFileSync(path.join(src, f.name)), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", raw, iv);
  const id = String(i).padStart(2, "0");
  fs.writeFileSync(path.join(out, "f", id + ".bin"), Buffer.concat([iv, c.update(plain), c.final(), c.getAuthTag()]));
  return { id, name: f.name, type: f.type, shell: !!f.shell };
});
const conf = JSON.stringify({ salt: cfg.sel, iter: cfg.iterations, files });
fs.writeFileSync(path.join(out, "index.html"), fs.readFileSync("src/verrou.html", "utf8").replace("@@CFG@@", conf));
fs.writeFileSync(path.join(out, ".nojekyll"), "");
console.log(files.length + " fichiers chiffrés dans " + out + "/");
