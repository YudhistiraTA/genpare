import { getAlbum } from '@/app/lib/api/album'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get('q')
	if (!query) return new Response()
	const res = await getAlbum(query)
	return new NextResponse(JSON.stringify(res))
}
