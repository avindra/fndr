
export async function read() {
	const decoder = new TextDecoder();
	let body = '';
	for await (const chunk of Deno.stdin.readable) {
		body += decoder.decode(chunk);
	}
	return body;
}

