import { ExternalLink, PiggyBank, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

function formatCurrency(value: number) {
	return value.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

export function SimulationHistoryPage() {
	const navigate = useNavigate()
	const { getAllFormData, deleteFormData } = useSimulationStorage()
	const [simulations, setSimulations] = useState(() => getAllFormData())

	const handleDelete = (id: string) => {
		const simulationToDelete = simulations.find((sim) => sim.id === id)

		if (!simulationToDelete) return

		const confirmed = window.confirm(
			`Excluir a simulação "${simulationToDelete.goalName}" do histórico?`,
		)

		if (!confirmed) return

		deleteFormData(id)
		setSimulations((prev) => prev.filter((sim) => sim.id !== id))
	}

	const sortedSimulations = [...simulations].sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0

		return dateB - dateA
	})

	if (simulations.length === 0) {
		return (
			<main className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
				<PageHero
					title="Histórico de simulações"
					subtitle="Você ainda não fez nenhuma simulação."
				/>
				<Button variant="primary" onClick={() => navigate('/')}>
					Fazer minha primeira simulação
				</Button>
			</main>
		)
	}

	return (
		<main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
			<PageHero
				title="Histórico de simulações"
				subtitle="Acompanhe o histórico de seus planos financeiros."
			/>
			<div className="flex flex-col gap-4">
				{sortedSimulations.map((sim) => {
					const monthlySavings = calcMonthlySavings(sim)
					const formattedDate = sim.createdAt
						? new Date(sim.createdAt).toLocaleDateString('pt-BR', {
								day: '2-digit',
								month: 'short',
								year: 'numeric',
							})
						: 'Data indisponível'
					return (
						<article
							key={sim.id}
							className="border-border/60 bg-card grid grid-cols-1 items-center gap-4 rounded-2xl border p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))_auto_auto]"
						>
							<div className="flex min-w-0 items-center gap-4">
								<div className="bg-muted-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
									<PiggyBank size={20} className="text-primary" />
								</div>
								<div className="min-w-0">
									<p className="text-foreground truncate font-semibold">{sim.goalName}</p>
									<p className="text-muted-foreground mt-1 text-sm">{formattedDate}</p>
								</div>
							</div>

							<div>
								<p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
									Custo da meta
								</p>
								<p className="text-foreground mt-1 text-sm font-semibold">{sim.goalAmount}</p>
							</div>
							<div>
								<p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
									Prazo
								</p>
								<p className="text-foreground mt-1 text-sm font-semibold">
									{sim.goalDeadline} meses
								</p>
							</div>
							<div>
								<p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
									Economia mensal
								</p>
								<p className="text-foreground mt-1 text-sm font-semibold">
									R$ {formatCurrency(monthlySavings)}
								</p>
							</div>

							<div className="border-border/60 hidden h-10 border-l sm:block" />

							<div className="flex items-center gap-3 justify-self-start sm:justify-self-end">
								<button
									aria-label="Excluir simulação"
									onClick={() => handleDelete(sim.id)}
									className="cursor-pointer text-red-500 transition-opacity hover:opacity-70"
								>
									<Trash2 size={18} />
								</button>
								<Button
									variant="secondary"
									icon={ExternalLink}
									onClick={() => navigate(`/resultado/${sim.id}`)}
								>
									Ver detalhes
								</Button>
							</div>
						</article>
					)
				})}
			</div>
		</main>
	)
}
