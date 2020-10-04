const path = require("path");
const fs = require("fs");
const glob = require("glob");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

const basePath = path.join(__dirname, "pages/api/");

function getAllApiRoutes() {
  return new Promise((resolve, reject) => {
    glob(basePath + "**/*.[jt]s", {}, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
}

async function main() {
  for (const apiRoutePath of await getAllApiRoutes()) {
    const pathEnd = apiRoutePath.slice(basePath.length);
    const content = fs.readFileSync(apiRoutePath).toString();
    const apiRoute = babelParser.parse(content, {
      sourceFilename: apiRoutePath,
      sourceType: "module",
      strictMode: true,
      plugins: ["typescript"],
    });

    let cronJobAlias = undefined;

    traverse(apiRoute, {
      ImportDeclaration(decl) {
        const isFromQuirrel = decl.node.source.value.includes("quirrel");
        if (isFromQuirrel) {
          decl.node.specifiers.forEach((specifier) => {
            if (specifier.imported.name === "CronJob") {
              cronJobAlias = specifier.local.name;
            }
          });
        }
      },
    });

    if (cronJobAlias) {
      traverse(apiRoute, {
        ExportDefaultDeclaration(decl) {
          if (t.isCallExpression(decl.node.declaration)) {
            const [{ value: cronPattern }] = decl.node.declaration.arguments;

            console.log({ cronPattern, path: pathEnd });
          }
        },
      });
    }
  }
}

main();
