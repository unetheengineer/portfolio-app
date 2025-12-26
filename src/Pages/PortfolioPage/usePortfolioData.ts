import { useState, useEffect } from 'react';
import type { PortfolioData, LocalizedPortfolioData } from './types';
import type { Language } from './i18n';
import { mockPortfolioData } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface UsePortfolioDataResult {
    data: PortfolioData | null;
    allData: LocalizedPortfolioData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const usePortfolioData = (language: Language): UsePortfolioDataResult => {
    const [allData, setAllData] = useState<LocalizedPortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // If no API URL configured, use mock data
            if (!API_BASE_URL) {
                setAllData(mockPortfolioData);
                return;
            }

            // Fetch all languages at once
            const response = await fetch(`${API_BASE_URL}/api/portfolio`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setAllData(result.data);
            } else {
                throw new Error(result.error || 'Failed to fetch data');
            }
        } catch (err) {
            console.error('Failed to fetch portfolio data:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            // Fallback to mock data on error
            setAllData(mockPortfolioData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Get data for current language, fallback to English
    const data = allData ? (allData[language] || allData.en || null) : null;

    return { data, allData, loading, error, refetch: fetchData };
};
