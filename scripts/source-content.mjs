export function getEntryBlocks(source) {
  return source
    .split(/\n {2}\{\n {4}id:\s*/)
    .slice(1)
    .map((block) => `id: ${block}`);
}

export function readStringField(block, field) {
  const expression = new RegExp(`${field}:\\s*(["'])([\\s\\S]*?)\\1`);
  const match = block.match(expression);
  return match?.[2]?.replaceAll('\\"', '"').replaceAll("\\'", "'") ?? null;
}

export function readId(block) {
  return block.match(/^id:\s*["']?([^,"'\n]+)["']?/)?.[1]?.trim() ?? null;
}

export function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
