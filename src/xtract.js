
/**
 * get only the first link
 */
function getLinks(text) {
	const links = (text.match(/href="[^"]+"/g) || [])
		.map(s => s.substring(6, s.length -1));
	return links;
}


const ids = {
	"facebook.com": /facebook.com\/pages\/(.+)/,
	"youtube.com": /youtube.com\/channel\/(.+)/,
	"instagram.com": /instagram.com\/([^\/]+)/,
	"vimeo.com": /vimeo.com\/([^\/]+)/,
	"pinterest.de": /pinterest.de\/(^\/]+)/,
	"tripadvisor.at": /tripadvisor.at\/(^\/]+)/,
}

export const getSocial = (body) => {
	return [...new Set(getLinks(body))].filter(link => {
		try {
			const u = new URL(link);
			const base = u.host.replace('www.', '');
			return base in ids;
		} catch(e) {} // URL throws on malformed URLS, just ignore for now

		return false;
	}).map(link => {
		const u = new URL(link);
		const base = u.host.replace('www.', '');
		const reg = ids[base];
		if (reg.test(link)) {
			return [base, link.match(reg)[1]];
		}

		return [null, link];
	});
}
