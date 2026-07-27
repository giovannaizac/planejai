import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
	value: string
	label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: SelectOption[]
	placeholder?: string
}

export function Select({ options, placeholder, className, ...props }: SelectProps) {
	return (
		<div className="relative">
			<select
				{...props}
				className={`border-border bg-background text-foreground w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm focus:ring-2 focus:ring-(--color-primary) focus:outline-none ${className ?? ''}`}
			>
				<option value="" disabled>
					{placeholder ?? 'Selecione uma opção'}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown
				size={18}
				className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
			/>
		</div>
	)
}
