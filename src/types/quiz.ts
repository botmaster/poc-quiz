export interface Quiz {
  version: number
  items: Question[]
  name: string
}

export interface Question {
  id: number
  body: string
  answers: Answer[]
  rightAnswerId: number
  duration?: number // in seconds
}

export interface QuestionWithUserAnswer extends Question {
  userAnswer: Answer
  answerIsRight: boolean
  rightAnswer: Answer
  timeSpent?: number
}

export interface Answer {
  id: number
  body: string
}
