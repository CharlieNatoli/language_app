

export type MessageType = 'user' | 'ai';


export interface HumanMessageCommentary {
  id: number,
  word_choice: string | null,
  style: string | null,
  grammar: string | null,
}

export interface Message {
    id : number;
    type: MessageType;
    content: string
    commentary: object | null
  }
 