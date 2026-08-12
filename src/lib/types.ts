import type { TechStack } from '../components/StackSelector';

export interface TeamMember {
  id: string;
  photo: string | null;
  name: string;
  handle: string; // X handle
  igHandle: string; // Insta handle
  stack: TechStack[];
  builderClass: string;
}
