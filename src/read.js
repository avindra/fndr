import { readLines } from "https://deno.land/std@0.159.0/io/buffer.ts?s=readLines";

export async function read() {
	let body = '';
	for await (const line of readLines(Deno.stdin)) {
		body += line;
	}
	return body;
}
