export type Character = {
  id: number;
  name: string;
  gender: string;
  species: string;
  status: string;
  image: string;
  url: string;
};

export type CharacterSummary = Pick<Character, 'id' | 'name' | 'url'> & {
  description: string;
};

export type CharacterSummaryWithChecked = CharacterSummary & {
  checked: boolean;
};

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
