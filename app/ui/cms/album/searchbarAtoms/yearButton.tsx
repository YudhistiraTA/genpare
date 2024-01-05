import { fetchYearOptions } from '@/app/lib/api/cms/album/yearOptions'
import { YearOptions } from '@/app/ui/cms/album/searchbarAtoms/yearOptions'

export async function YearButton() {
	const data = await fetchYearOptions()
	return (
		<div className="dropdown lg:dropdown-end">
			<YearOptions years={data} />
		</div>
	)
}
