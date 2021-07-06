
import { exec } from "https://deno.land/x/exec/mod.ts";

const engines = [
	"https://images.google.com/images",
	"https://news.google.com/news",
	"https://maps.google.com/maps",
	"https://images.bing.com/",
	"https://duckduckgo.com/",
];

/**
 * @permission exec
 */
export const goto = async function(base: string = "http://www.", unsafe: boolean, path: string = '') {
	const executor = unsafe ? `firefox -private-window` : "xdg-open";
	const line = `${executor} "${base + path}"`;
	console.log("running", line);
	await exec(line);
};

/***
 * 
 * id is a number corresponding to a particular Search engine.
 * should be an enum
 * 
 * returns the string pair [url', query]
 * 
 * where url' is the partial URL leading up to the first ?
 * 
 * @note does not perform a search
 */
export const searchFor = function(
	id: number,
	query: string,
	isBig: boolean,
	unsafe: boolean
) {
	const e = engines[id];
	const isBing = 3 == id;
	const isDDG = 4 == id;
	let params = new URLSearchParams();
	if (unsafe) {
		if (isDDG) {
			params.set("kp", "-2");
		} else if(isBing) {
			params.set("safesearch", "off");
		} else { // assume google
			params.set("safe", "images");
		}
	}
	if (isDDG) {
		params.set("iax", "images");
		params.set("ia", "images");
	}
	if (isBig) {
		if (isBing) {
			params.set("qft", "+filterui:imagesize-custom_1920_1080");
		} else if(isDDG) {
			params.set("iaf", "size:Large");
		} else { // assume google
			params.set("tbs", "isz:lt,islt:2mp");
		}
	}
	params.set("q", query);
	goto(e, unsafe, "?" + params.toString());
};