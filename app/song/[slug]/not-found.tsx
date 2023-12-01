import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<h2 className="text-xl font-semibold">404 Not Found</h2>
			<p>Could not find the requested song.</p>
			<Link
				href="/"
				className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-opacity-50"
			>
				Go Back
			</Link>
		</main>
	)
}
