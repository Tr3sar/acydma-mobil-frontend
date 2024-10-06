export interface Calendar {
    day: string;
    partits: Partit[];
}

export interface Partit {
    team1: string;
    team2: string;
    matchDate: string;
}