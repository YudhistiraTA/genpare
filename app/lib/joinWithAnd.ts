export function joinWithAnd(arr: string[]): string {
	if (arr.length === 1) return `${arr}`
	const clone = [...arr]
	const last = clone.pop() as string
	return clone.length ? `${clone.join(', ')}, and ${last}`.trim() : last.trim()
}
