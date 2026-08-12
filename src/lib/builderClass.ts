import type { TechStack } from '../components/StackSelector';

export const determineBuilderClass = (stack: TechStack[]): string => {
  if (stack.length === 0) return 'Undiscovered Talent';

  const hasFrontend = stack.some(s => ['React', 'Vue', 'Svelte', 'Next.js', 'UI/UX'].includes(s));
  const hasBackend = stack.some(s => ['Node.js', 'Python', 'Go', 'Rust'].includes(s));
  const hasWeb3 = stack.some(s => ['Solidity', 'Rust (Solana)', 'Cairo', 'Move'].includes(s));
  const hasData = stack.some(s => ['AI/ML', 'Data Science'].includes(s));

  if (hasWeb3 && hasFrontend) return 'Web3 Alchemist';
  if (hasWeb3 && hasBackend) return 'Chain Architect';
  if (hasWeb3) return 'DeFi Degen';
  
  if (hasFrontend && hasBackend) return 'Full-Stack Sorcerer';
  if (hasFrontend && hasData) return 'AI UI Wizard';
  if (hasBackend && hasData) return 'Data Overlord';
  
  if (stack.includes('UI/UX') && stack.includes('Product')) return 'Vibe Engineer';
  if (hasFrontend) return 'Pixel Pusher';
  if (hasBackend) return 'Server Samurai';
  if (hasData) return 'Neural Ninja';

  if (stack.includes('Marketing') || stack.includes('Product')) return 'Growth Hacker';
  if (stack.includes('Security') || stack.includes('DevOps')) return 'Infra Guardian';

  return 'Code Artisan';
};
