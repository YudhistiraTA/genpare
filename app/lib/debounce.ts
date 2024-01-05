export function debounce(fn: (input: string) => void, delay: number) {
	let timeoutId: NodeJS.Timeout
	return (input: string) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(input), delay)
	}
}
export function debounceHTML(
	fn: (event: React.ChangeEvent<HTMLInputElement>) => void,
	delay: number,
) {
	let timeoutId: NodeJS.Timeout
	return (event: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(event), delay)
	}
}
