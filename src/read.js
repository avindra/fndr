import { readLines } from "https://deno.land/std@0.100.0/io/bufio.ts";

export async function read() {
	let body = '';
	for await (const line of readLines(Deno.stdin)) {
		body += line;
	}
	return body;
}
