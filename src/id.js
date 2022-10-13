/**
 * Identify id for a given search term.
 * 
 * Supports:
 *  - Google Knowledge Graph id (freebase + regular)
 */

const kgmbase = `https://www.google.com/search?kgmid=`;

const headers = new Headers({
	"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0"
});

const bannedIds = [
	"/m/0jg24" // basic "Image" concept
];

/**
 * get only the first link
 */
export function findLink(text) {
		const links = (text.match(/href="[^"]+" data-jsarwt/g) || [])
		.map(s => s.substring(6, s.length -13))
		.filter(l => l && !l.startsWith("/") && !/\.googl/.test(new URL(l).host));
	return links.length > 0 ? links[0] : '';
}

/**
 * Find knowledge ID from source text
 */
export function findIds(text) {
	let results = text.match(/22\/[gm]\/[^\\]+/g);

	if (results) {
		results = results.map(s => s.substring(2))
			.filter(id => !bannedIds.includes(id));
		
		// uniq
		results = [...new Set(results)];

		if (results.length > 1) {
			console.warn("Non-singular result");
		}

		for(const r of results) {
			console.log(kgmbase + r);
		} 
	}

	return false;
}


/**
 * @permission net
 */
export async function getResults(input) {
	const response = await fetch(`http://google.com/search?q=${input}`, {
		headers
	});
	const text = await response.text();
	// dump prev result for debugging purposes
	// Deno.writeFileSync("/tmp/_ag_last", new TextEncoder().encode(text));
	return text;
}