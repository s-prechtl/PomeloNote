function getNoteIdFromUrl(url) {
  return Number(url.split("/").at(-1));
}
