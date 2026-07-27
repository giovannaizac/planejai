const BCB_CDI_MENSAL_URL =
	'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados/ultimos/1?formato=json'

interface BCBResponse {
	data: string
	valor: string
}

export async function fetchCDIMonthlyRate(): Promise<number> {
	const response = await fetch(BCB_CDI_MENSAL_URL)

	if (!response.ok) {
		throw new Error(`Erro ao buscar taxa CDI: ${response.status}`)
	}

	const data = (await response.json()) as BCBResponse[]

	if (!data[0]?.valor) {
		throw new Error('Taxa CDI não encontrada na resposta')
	}

	return parseFloat(data[0].valor) / 100
}
