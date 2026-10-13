// Publie dist/ sur la branche gh-pages (historique réécrit : un seul commit).
import { execSync } from "node:child_process"; import fs from "node:fs";
if (!fs.existsSync("dist/index.html")) { console.error("Lancer d'abord build-content.mjs"); process.exit(1); }
const sh = c => execSync(c, { stdio: "inherit" });
const remote = execSync("git remote get-url origin").toString().trim();
sh("rm -rf .deploy && mkdir .deploy && cp -r dist/. .deploy/");
sh(`cd .deploy && git init -q -b gh-pages && git add -A && git -c user.name='Claude' -c user.email='noreply@anthropic.com' commit -q -m 'Déploiement du site chiffré' && git push -f ${remote} gh-pages`);
sh("rm -rf .deploy");
