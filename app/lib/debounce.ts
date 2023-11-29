export default function debounce(fn: (input: string) => void, delay: number) {
	let timeoutId: NodeJS.Timeout
	return (input: string) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn(input), delay)
	}
}
