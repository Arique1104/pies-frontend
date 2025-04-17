export type Role = 'individual' | 'leader' | 'owner';

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}