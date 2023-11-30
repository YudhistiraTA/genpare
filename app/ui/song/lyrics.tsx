export function Lyrics({ main, sub }: { main?: string; sub?: string }) {
	if (!main || !sub) return <p>Invalid input</p>
	const mainArray = main.split('\\n')
	const subArray = sub.split('\\n')
	if (mainArray.length !== subArray.length) return <p>Invalid format</p>
	return mainArray.map((line, index) => (
		<ruby key={`lyrics line ${index}`} className="text-xl">
			{line}
			<rt className="text-sm opacity-70">{subArray[index]}</rt>
		</ruby>
	))
}
