
/**
 * Trim image and URL attributes
 * from QuickStatements (useful for
 * asynchronous use of Wikidata).
*/
export function getClean(input) {
	var raw = decodeURIComponent(input);

	// just get v1= value
	var idx = raw.indexOf('#') + 5;


	var base = raw.substring(0, idx);

	var query = raw.substring(idx);

	var cleanQuery = query.replace(/S4656\|[^\|]+/g, '');
	cleanQuery = cleanQuery.replace(/P18\|[^\|]+/g, '');

	return base + encodeURIComponent(cleanQuery);
}


