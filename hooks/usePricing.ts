import { useState, useMemo } from 'react';

export type Websites = 1 | 5 | 25;
export type LogRetention = '30days' | '90days' | '1year';
export type AiResponse = 'automated' | 'manual';

export function usePricing() {
  const [websites, setWebsites] = useState<Websites>(1);
  const [logRetention, setLogRetention] = useState<LogRetention>('30days');
  const [aiResponse, setAiResponse] = useState<AiResponse>('automated');

  const basePrice = 400; // Requirement says License: $400, but logic says base 800? 
  // Wait, requirement says: basePrice = 800. Let's stick to the technical requirement:
  const actualBasePrice = 800;
  
  const websitePrices = { 1: 0, 5: 300, 25: 800 };
  const logPrices = { '30days': 0, '90days': 200, '1year': 500 };
  const aiPrices = { automated: 0, manual: 400 };

  const total = useMemo(() => {
    return (
      actualBasePrice +
      websitePrices[websites] +
      logPrices[logRetention] +
      aiPrices[aiResponse]
    );
  }, [websites, logRetention, aiResponse]);

  return {
    websites,
    setWebsites,
    logRetention,
    setLogRetention,
    aiResponse,
    setAiResponse,
    total,
    breakdown: {
      base: actualBasePrice,
      websites: websitePrices[websites],
      logs: logPrices[logRetention],
      ai: aiPrices[aiResponse],
    }
  };
}
