import { Members, User } from '../types';

class KDatabase {

  private members: Members[] = [];
  private groupLimits: { [key: string]: number } = {
    'NewJeans': 5,
    'TVXQ': 2,
    'BLACKPINK': 4
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
  findByBand(band: string): Members | undefined {
    return this.members.find(member => member.band === band);
  }

}

export const kdb = new KDatabase();
