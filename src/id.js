/**
 * Identify id for a given search term.
 * 
 * Supports:
 *  - Google Knowledge Graph id (freebase + regular)
 */

const kgmbase = `https://www.google.com/search?kgmid=`;

const headers = new Headers({
	"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0"
});

const bannedIds = [
	"/m/0jg24" // basic "Image" concept
];


/**
 * Find knowledge ID from source text
 */
export function findId(text) {
	let results = text.match(/22\/[gm]\/[^\\]+/g);

	if (results) {
		results = results.map(s => s.substring(2))
			.filter(id => !bannedIds.includes(id));

		if (results.length == 1) {
			return kgmbase + results[0];
		} else {
			console.warn("Non-singular result", results);
		}
	}

	return false;
}


/**
 * @permission net
 */
export async function getId(input) {
	const response = await fetch(`http://google.com/search?q=${input}`, {
		headers
	});
	const text = await response.text();
	return findId(text);
}