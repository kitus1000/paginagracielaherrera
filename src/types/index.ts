export type NavTab = 'home' | 'units' | 'demo' | 'games' | 'downloads';

export interface Subtopic {
  id: string;
  code: string;
  title: string;
  summary: string;
  details: string[];
  formulas: string[];
  historicalNote?: string;
  figureUrl?: string;
  figureCaption?: string;
}

export interface MasterProblem {
  id: string;
  number: string;
  title: string;
  statement: string;
  statementMath?: string;
  steps: {
    label: string;
    description: string;
    math?: string;
  }[];
  finalResult: string;
}

export interface Exercise {
  id: string;
  code: string;
  statement: string;
  mathStatement?: string;
  solution: string;
  category: string;
}

export interface UnitData {
  id: number;
  code: string;
  title: string;
  badge: string;
  summary: string;
  gradient: string;
  accentColor: string;
  subtopics: Subtopic[];
  masterProblems: MasterProblem[];
  exercises: Exercise[];
}

export interface DragMatchItem {
  id: string;
  integralLatex: string;
  solutionLatex: string;
  method: string;
  difficulty: 'facil' | 'medio' | 'avanzado';
}

export interface SpeedSorterQuestion {
  id: string;
  integralLatex: string;
  correctMethod: string;
  options: string[];
  explanation: string;
  hint: string;
}

export interface StepPuzzleItem {
  id: string;
  title: string;
  integralLatex: string;
  shuffledSteps: {
    id: string;
    correctIndex: number;
    text: string;
    math?: string;
  }[];
  finalNote: string;
}

export interface BossQuestion {
  id: string;
  question: string;
  math?: string;
  options: string[];
  correctIndex: number;
  hint: string;
  xp: number;
}

export interface BossLevel {
  id: number;
  name: string;
  title: string;
  unit: string;
  maxHp: number;
  avatar: string;
  dialogue: string;
  questions: BossQuestion[];
}
