export interface User {
  id: string;
  name: string;
  email: string;
  bias: string;
  favGroup: string;
  fandomName: string;
  createdAt: Date;
}

export interface Members {
  name: string;
  colorfav: string;
  age: number;
  animal: string;
  band: string;
}

export interface GroupName {
  name: string;
  fandom: string;
  debutDate: string;
  albuns: string;
}