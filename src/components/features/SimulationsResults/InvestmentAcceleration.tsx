import { TrendingUp } from 'lucide-react'

import { useInvestmentProjection } from '@/hooks/useInvestmentProjection'

interface InvestmentAccelerationProps {
	monthlySavings: number
	goalAmount: string
	deadlineMonths: string
}

export function InvestmentAcceleration({
	monthlySavings,
	goalAmount,
	deadlineMonths,
}: InvestmentAccelerationProps) {
	const { projection, isLoading, error } = useInvestmentProjection(
		monthlySavings,
		goalAmount,
		deadlineMonths,
	)

	if (isLoading) {
		return (
			<div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
				<p className="text-muted-foreground text-sm">Calculando projeção com rendimento...</p>
			</div>
		)
	}

	if (error || !projection) {
		return null
	}

	return (
		<div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
			<div className="mb-3 flex items-center gap-1.5">
				<TrendingUp size={16} className="text-primary" />
				<span className="text-primary text-xs font-semibold tracking-widest uppercase">
					Seu dinheiro rendendo
				</span>
			</div>
			{projection.monthsSaved > 0 ? (
				<p className="text-foreground text-sm leading-relaxed">
					Se o valor guardado render à taxa CDI atual, sua meta pode ser alcançada em{' '}
					<strong>{projection.monthsWithInterest} meses</strong> em vez de{' '}
					{projection.monthsWithoutInterest} —{' '}
					<strong>{projection.monthsSaved} meses mais rápido</strong>.
				</p>
			) : (
				<p className="text-foreground text-sm leading-relaxed">
					Com rendimento à taxa CDI atual, você chegaria à meta em{' '}
					<strong>{projection.monthsWithInterest} meses</strong>, dentro do prazo planejado.
				</p>
			)}
		</div>
	)
}
