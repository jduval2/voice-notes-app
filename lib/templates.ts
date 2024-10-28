import { 
  Layout, ListChecks, FileText, Briefcase,
  Notebook, GraduationCap
} from 'lucide-react';
import { TemplateConfig } from '@/types';

export const TEMPLATES: { [key: string]: TemplateConfig } = {
  PARA: {
    id: 'para',
    name: 'P.A.R.A. Method',
    icon: Layout,
    categories: {
      PROJECTS: {
        name: 'Projects',
        keywords: ['project', 'deadline', 'milestone', 'deliver', 'complete by']
      },
      AREAS: {
        name: 'Areas',
        keywords: ['health', 'finance', 'career', 'family', 'relationship']
      },
      RESOURCES: {
        name: 'Resources',
        keywords: ['reference', 'learn', 'article', 'book', 'video']
      },
      ARCHIVES: {
        name: 'Archives',
        keywords: []
      }
    }
  },
  GTD: {
    id: 'gtd',
    name: 'Getting Things Done (GTD)',
    icon: ListChecks,
    categories: {
      INBOX: {
        name: 'Inbox',
        keywords: ['new', 'incoming', 'todo', 'task', 'idea']
      },
      NEXT_ACTIONS: {
        name: 'Next Actions',
        keywords: ['next', 'action', 'do', 'task', 'immediately']
      },
      WAITING_FOR: {
        name: 'Waiting For',
        keywords: ['waiting', 'pending', 'follow up', 'check with', 'await']
      },
      SOMEDAY_MAYBE: {
        name: 'Someday/Maybe',
        keywords: ['maybe', 'future', 'consider', 'possibly', 'might']
      },
      REFERENCE: {
        name: 'Reference',
        keywords: ['reference', 'info', 'document', 'store']
      }
    }
  },
  MEETING_NOTES: {
    id: 'meeting',
    name: 'Meeting Notes',
    icon: FileText,
    categories: {
      AGENDA: {
        name: 'Agenda Items',
        keywords: ['agenda', 'discuss', 'topic', 'point']
      },
      ACTION_ITEMS: {
        name: 'Action Items',
        keywords: ['action', 'task', 'todo', 'assign', 'follow up']
      },
      DECISIONS: {
        name: 'Decisions',
        keywords: ['decide', 'decision', 'agreed', 'conclusion', 'resolved']
      },
      NOTES: {
        name: 'Discussion Notes',
        keywords: ['note', 'discuss', 'mention', 'point', 'highlight']
      }
    }
  },
  CORNELL: {
    id: 'cornell',
    name: 'Cornell Notes',
    icon: GraduationCap,
    categories: {
      MAIN_NOTES: {
        name: 'Main Notes',
        keywords: ['note', 'point', 'topic', 'discuss']
      },
      QUESTIONS: {
        name: 'Questions',
        keywords: ['question', 'query', 'what', 'why', 'how', '?']
      },
      KEY_POINTS: {
        name: 'Key Points',
        keywords: ['key', 'important', 'critical', 'essential', 'remember']
      },
      SUMMARY: {
        name: 'Summary',
        keywords: ['summary', 'conclude', 'overall', 'summarize']
      }
    }
  },
  BUSINESS: {
    id: 'business',
    name: 'Business Planning',
    icon: Briefcase,
    categories: {
      OBJECTIVES: {
        name: 'Objectives',
        keywords: ['goal', 'objective', 'target', 'aim']
      },
      STRATEGIES: {
        name: 'Strategies',
        keywords: ['strategy', 'plan', 'approach', 'method']
      },
      TASKS: {
        name: 'Tasks',
        keywords: ['task', 'action', 'todo', 'implement']
      },
      METRICS: {
        name: 'Metrics',
        keywords: ['metric', 'measure', 'kpi', 'result', 'outcome']
      }
    }
  }
};
