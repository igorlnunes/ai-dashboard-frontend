// Mapeamento de P/E ratios conhecidos para ações populares
// Estes valores são aproximados e podem ser atualizados
export const PE_RATIOS: Record<string, number> = {
    'AAPL': 29.1,
    'GOOGL': 22.5,
    'MSFT': 31.2,
    'TSLA': 42.8,
    'AMZN': 35.7,
    'NVDA': 55.4,
    'META': 28.3,
    'NFLX': 45.2,
    'AMD': 38.9,
    'INTC': 15.2,
};

// Mapeamento de nomes de empresas conhecidos
export const COMPANY_NAMES: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'GOOGL': 'Alphabet Inc.',
    'MSFT': 'Microsoft Corporation',
    'TSLA': 'Tesla Inc.',
    'AMZN': 'Amazon.com Inc.',
    'NVDA': 'NVIDIA Corporation',
    'META': 'Meta Platforms Inc.',
    'NFLX': 'Netflix Inc.',
    'AMD': 'Advanced Micro Devices Inc.',
    'INTC': 'Intel Corporation',
};

export const getPERatio = (ticker: string): number | undefined => {
    return PE_RATIOS[ticker.toUpperCase()];
};

export const getCompanyName = (ticker: string): string | undefined => {
    return COMPANY_NAMES[ticker.toUpperCase()];
};

