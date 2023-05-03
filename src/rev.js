import {goto} from './search.ts';
/**
 * Perform reverse image search
 *
 * @todo do this using `fetch` instead of `curl`
 * @see https://stackoverflow.com/a/62088422/270302
 */
export const rev = async () => {
	const p = Deno.run({
		cmd: [
			"curl",
			"-F",
			"encoded_image=@/dev/stdin",
			"https://lens.google.com/upload"
		],
		stdout: "piped",
		stdin: "piped"
	});

	const decoder = new TextDecoder();

	await Deno.copy(Deno.stdin, p.stdin);

	await p.stdin.close();
	const output = await p.output()
	p.close();

	const txt = decoder.decode(output);

	const g = txt.match(/HREF="([^"]+)/);
	if(g) {
		goto(g[1])
	} else {
		console.log(txt);
	}
}
