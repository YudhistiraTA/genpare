export function Lyrics({ main, sub }: { main?: string; sub?: string }) {
	if (!main || !sub) return <p>Invalid input</p>
	const mainArray = main.split('\\n')
	const subArray = sub.split('\\n')
	if (mainArray.length !== subArray.length) return <p>Invalid format</p>
	return mainArray.map((line, index) => {
		return (
			<ruby
				key={`lyrics line ${index}`}
				className="lg:text-xl text-left flex flex-wrap flex-col hover:bg-accent hover:bg-opacity-60 rounded-2xl px-1 transition-colors whitespace-pre-wrap"
			>
				<rt className="text-xs text-left whitespace-pre-wrap lg:text-sm opacity-70">{subArray[index]}</rt>
				{line}
			</ruby>
		)
	})
}
