export interface InvestmentProjection {
	monthsWithoutInterest: number
	monthsWithInterest: number
	monthsSaved: number
	finalAmountWithInterest: number
}

export function calculateInvestmentAcceleration(
	monthlySavings: number,
	goalAmount: number,
	deadlineMonths: number,
	monthlyRate: number,
): InvestmentProjection {
	let accumulated = 0
	let monthsWithInterest = 0

	while (accumulated < goalAmount && monthsWithInterest < deadlineMonths * 3) {
		accumulated = accumulated * (1 + monthlyRate) + monthlySavings
		monthsWithInterest++
	}

	const finalAmountWithInterest = accumulated

	return {
		monthsWithoutInterest: deadlineMonths,
		monthsWithInterest,
		monthsSaved: Math.max(deadlineMonths - monthsWithInterest, 0),
		finalAmountWithInterest,
	}
}
