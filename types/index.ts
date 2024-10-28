export interface NoteItem {
  text: string;
  category: string;
  deadline: string | null;
  tags: string[];
  timestamp: string;
  completed: boolean;
  priority: 'normal' | 'high';
}

export interface CategoryConfig {
  name: string;
  keywords: string[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  icon: any;
  categories: {
    [key: string]: CategoryConfig;
  };
}

export interface ItemsByCategory {
  [category: string]: NoteItem[];
}
