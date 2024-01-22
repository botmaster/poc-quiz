export interface Quiz {
  version: number
  items: Question[]
}

export interface Question {
  id: number
  body: string
  answers: Answer[]
  rightAnswerId: number
}

export interface QuestionWithUserAnswer extends Question {
  userAnswer: Answer
  answerIsRight: boolean
  rightAnswer: Answer
}

export interface Answer {
  id: number
  body: string
}
