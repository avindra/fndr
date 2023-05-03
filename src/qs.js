/**
 * Trim image and URL attributes
 * from QuickStatements (useful for
 * asynchronous use of Wikidata).
 */

function cleanQuickStatement(input) {
	const raw = decodeURIComponent(input);

	// just get v1= value
	const idx = raw.indexOf("#") + 5;

	const base = raw.substring(0, idx);

	const query = raw.substring(idx);

	var cleanQuery = query.replace(/S4656\|[^\|]+/g, "");
	cleanQuery = cleanQuery.replace(/P18\|[^\|]+/g, "");
	cleanQuery = cleanQuery.replace(/P143\|[^\|]+/g, "");

	return base + encodeURIComponent(cleanQuery);
}

function cleanGoogleLink(input) {
	const U = new URL(input);
	const params = new URLSearchParams(U.search);
	return params.get("url");
}

export function getClean(input) {
	if (input.includes("google.com")) {
		return cleanGoogleLink(input);
	}
	return cleanQuickStatement(input);
}
