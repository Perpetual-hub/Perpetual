import { getSearchIndex } from "@/lib/data";

// Static JSON for the ⌘K palette, fetched only when search is first opened,
// so the index doesn't ship with every page.
export function GET() {
  return Response.json(getSearchIndex());
}
