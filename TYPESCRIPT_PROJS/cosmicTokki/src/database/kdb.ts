import { Members, User } from '../types';
import { Database } from "bun:sqlite";

class KDatabase {
  private members: Members[] = [];
    private groupLimits: { [key: string]: number } = {
      'NewJeans': 5,
      'TVXQ': 2,
      'BLACKPINK': 4,
      'BTS': 7,
      'TWICE': 9,
      'SEVENTEEN': 13,
      'EXO': 9,
      'Red Velvet': 5,
      'NCT 127': 10,
      'NCT Dream': 7,
      'ITZY': 5,
      'aespa': 4,
      'Stray Kids': 8,
      'ENHYPEN': 7,
      'LE SSERAFIM': 6,
      'IVE': 6,
      'TREASURE': 10,
      'Tomorrow X Together': 5,
      'SHINee': 5,
      'BIGBANG': 4,
      '2NE1': 4,
      'Super Junior': 11, // Based on active members
      'Girls Generation': 8,
      'Kep1er': 9,
      'LOONA': 12,
      'Mamamoo': 4,
      'MONSTA X': 6,
      'ASTRO': 5,
      'GOT7': 7,
      'WINNER': 4,
      'VIXX': 6
    // Add other groups as needed
  };

  createIdol(kData: Omit<Members, 'id'>): Members | { error: string } {
    // Check if adding this member would exceed the group limit
    const currentGroupCount = this.members.filter(m => m.band === kData.band).length;
    const groupLimit = this.groupLimits[kData.band];

    if (groupLimit && currentGroupCount >= groupLimit) {
      return {
        error: `Cannot add more members to ${kData.band}. Group limit (${groupLimit}) reached.`
      };
    }

    // Check for duplicate name in the same group
    const isDuplicate = this.members.some(
      m => m.name === kData.name && m.band === kData.band
    );

    if (isDuplicate) {
      return {
        error: `Member ${kData.name} already exists in ${kData.band}`
      };
    }

    const newMember = {
      name: kData.name,
      colorfav: kData.colorfav,
      age: kData.age,
      animal: kData.animal,
      band: kData.band
    };

    this.members.push(newMember);
    return newMember;
  }

  // Add method to update group limits
  updateGroupLimit(band: string, newLimit: number): void {
    this.groupLimits[band] = newLimit;
  }
  // Optional: Add other helpful methods
  findAll(): Members[] {
    return this.members;
  }

  findByName(name: string): Members | undefined {
    return this.members.find(member => member.name === name);
  }
  findByBand(band: string): Members[] {
    // Use filter instead of find to get all members of the band
    return this.members.filter(member => member.band === band);
  }

}

export const kdb = new KDatabase();
