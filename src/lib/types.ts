export interface User {
    id: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
    isAdmin?: boolean;
}

export interface Faction {
    id: string;
    Name: string;
    Description?: string;
}

export interface Skill {
    id: string;
    Name: string;
    Description?: string;
    Passive?: boolean;
    RessourcesSpend?: string;
    Requirement?: string;
    Cost?: number;
}

export interface Character {
    id: string;
    Name: string;
    Title?: string;
    Description?: string;
    NPC?: boolean;
    Skills?: string[];
    Owner?: string;
    Affiliation?: string[];
    // Relations étendues via expand
    expand?: {
        Skills?: Skill[];
        Owner?: User;
        Affiliation?: Faction[];
    };
}