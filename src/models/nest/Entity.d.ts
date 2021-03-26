export interface Entity {
  bedrockId: string;
  name: string;
  nameJapanese?: string;
  health?: number;
  iconUrl?: string;
  iconBgPos?: string;
  dec?: number;
  hex?: string;
  pictureUrl?: string;
  description?: string;
  size?: string;
  firstAdded?: string;
  rarelity?:
    | 'Common'
    | 'Uncommon'
    | 'Rare'
    | 'Very Rare'
    | 'Super Rare'
    | 'Victory'
    | 'Legend'
    | 'Master';
  type?: 'passive' | 'friendly' | 'hostile';
}
