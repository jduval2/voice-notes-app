import { NoteItem, TemplateConfig } from '@/types';

export const processContent = (
  text: string,
  template: TemplateConfig
): NoteItem[] => {
  const sentences = text.toLowerCase().split(/[.!?]+/).filter(Boolean);
  const items: NoteItem[] = [];

  sentences.forEach(sentence => {
    // Determine category based on template keywords
    let matchedCategory = Object.keys(template.categories)[0]; // Default to first category
    let highestKeywordMatch = 0;

    Object.entries(template.categories).forEach(([category, config]) => {
      const matchCount = config.keywords.filter(keyword => 
        sentence.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > highestKeywordMatch) {
        highestKeywordMatch = matchCount;
        matchedCategory = category;
      }
    });

    // Extract deadline
    const deadlineMatch = sentence.match(
      /by\s(\w+\s\d{1,2}(?:st|nd|rd|th)?|\d{1,2}(?:st|nd|rd|th)?\s\w+)/i
    );
    const deadline = deadlineMatch ? deadlineMatch[1] : null;

    // Extract tags
    const tags = sentence.match(/#\w+/g) || [];

    const newItem: NoteItem = {
      text: sentence.trim(),
      category: matchedCategory,
      deadline,
      tags,
      timestamp: new Date().toISOString(),
      completed: false,
      priority: sentence.includes('urgent') || sentence.includes('important')
        ? 'high'
        : 'normal'
    };

    items.push(newItem);
  });

  return items;
};
