import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" data-theme="genpare">
			<body>{children}</body>
		</html>
	)
}
