import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" data-theme="pastel">
			<body>{children}</body>
		</html>
	)
}
