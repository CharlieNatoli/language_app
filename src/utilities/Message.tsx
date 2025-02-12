export type MessageType = "user" | "ai";

export interface Message {
  id: number;
  type: MessageType;
  content: string;
  commentary: object | null;
}
