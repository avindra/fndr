
/**
 * get only the first link
 */
function getLinks(text) {
	const links = (text.match(/href="[^"]+"/g) || [])
		.map(s => s.substring(6, s.length -1));
	return links;
}


const tripAdvisor = /(g\d+-d\d+)/;
const ids = {
	"facebook.com": /facebook.com\/pages\/(.+)/,
	"youtube.com": /youtube.com\/channel\/(.+)/,
	"instagram.com": /instagram.com\/([^\/]+)/,
	"vimeo.com": /vimeo.com\/([^\/]+)/,
	"pinterest.de": /pinterest.de\/(^\/]+)/,
	"tripadvisor.at": tripAdvisor,
	"tripadvisor.com": tripAdvisor,
}

export const getSocial = (body) => {
	return [...new Set(getLinks(body))].map(
		link => {
			try {
				const u = new URL(link);
				// drop subdomain specifications
				const rootDomain = u.host.replace(/^(.+)\.(.+)\.(.+)$/, `$2.$3`);

				u.host = rootDomain;
				return u.toString();
			} catch(e) {
				return link;
			}
	}).filter(link => {
		try {
			const u = new URL(link);
			const base = u.host;

			return base in ids;
		} catch(e) {} // URL throws on malformed URLS, just ignore for now

		return false;
	}).map(link => {
		const u = new URL(link);
		const base = u.host;
		const reg = ids[base];
		if (reg.test(link)) {
			return [base, link.match(reg)[1]];
		}

		return [null, link];
	});
}
