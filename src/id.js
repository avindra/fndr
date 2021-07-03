/**
 * Identify id for a given search term.
 * 
 * Supports:
 *  - Google Knowledge Graph id (freebase + regular)
 */

export async function getId(input) {
	const response = await fetch(`http://google.com/search?q=${input}`);
	const text = await response.text();
	const results = text.match(/\\x22(\/[gm]\/.+)\\x22/);
	if (results) {
		return results[1];
	}

	return false;
}