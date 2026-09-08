import PocketBase from 'pocketbase';
import type { Character, Faction, Skill } from '$lib/types';

export const pb = new PocketBase('http://wiki-svelte.fly.dev');

// --- GETTERS ---

export async function getCharacters(): Promise<Character[]> {
    return await pb.collection('CHARACTER').getFullList<Character>({
        sort: '-created',
        expand: 'Skills,Owner,Affiliation'
    });
}

export async function getCharacterById(id: string): Promise<Character> {
    return await pb.collection('CHARACTER').getOne<Character>(id, {
        expand: 'Skills,Owner,Affiliation'
    });
}

export async function getFactions(): Promise<Faction[]> {
    return await pb.collection('FACTIONS').getFullList<Faction>({
        sort: 'Name'
    });
}

export async function getSkills(): Promise<Skill[]> {
    return await pb.collection('SKILL').getFullList<Skill>({
        sort: 'Name'
    });
}

// --- MUTATIONS ---

export async function createCharacter(characterData: Partial<Character>): Promise<Character> {
    return await pb.collection('CHARACTER').create<Character>(characterData);
}

export async function updateCharacter(id: string, characterData: Partial<Character>): Promise<Character> {
    return await pb.collection('CHARACTER').update<Character>(id, characterData);
}

export async function deleteCharacter(id: string): Promise<boolean> {
    return await pb.collection('CHARACTER').delete(id);
}