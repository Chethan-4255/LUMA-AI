export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  products?: ProductSuggestion[];
  isError?: boolean;
}

export interface ProductSuggestion {
  title: string;
  url: string;
  price?: string;
  source?: string;
}

export interface GeneratedImage {
  id: string;
  styleName: string;
  imageUrl: string; // Base64 or URL
  prompt: string;
}

export enum RoomStyle {
  MODERN = 'Modern Minimalist',
  SCANDINAVIAN = 'Scandinavian',
  MID_CENTURY = 'Mid-Century Modern',
  INDUSTRIAL = 'Industrial Loft',
  BOHEMIAN = 'Bohemian Chic',
  COASTAL = 'Coastal Breeze'
}
