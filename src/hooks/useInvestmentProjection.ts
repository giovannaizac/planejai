import { useEffect, useState } from 'react'

import { fetchCDIMonthlyRate } from '@/Service/bcbService'
import { parseCurrency } from '@/utils/currency'
import { calculateInvestmentAcceleration, type InvestmentProjection } from '@/utils/investment'

export function useInvestmentProjection(
	monthlySavings: number,
	goalAmount: string,
	deadlineMonths: string,
) {
	const [projection, setProjection] = useState<InvestmentProjection | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let cancelled = false

		async function run() {
			setIsLoading(true)
			setError(null)

			try {
				const monthlyRate = await fetchCDIMonthlyRate()
				console.log('Taxa mensal CDI:', monthlyRate)
				const result = calculateInvestmentAcceleration(
					monthlySavings,
					parseCurrency(goalAmount),
					parseInt(deadlineMonths),
					monthlyRate,
				)

				if (!cancelled) {
					setProjection(result)
				}
			} catch {
				if (!cancelled) {
					setError('Não foi possível calcular a projeção agora.')
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false)
				}
			}
		}

		void run()

		return () => {
			cancelled = true
		}
	}, [monthlySavings, goalAmount, deadlineMonths])

	return { projection, isLoading, error }
}
