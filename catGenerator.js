export default async function CatNameGenerator() {
  const catFile = await readFiles("./cats.txt", "utf8");
  const catNames = catFile.split("\n");
  const index = Math.floor(Math.random() * catNames.length);
  const catName = catNames[index];
  const json = { catName };
}
