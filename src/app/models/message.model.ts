export interface Message {
    id: string;
    text: string;
    createdAt: Date;    
    chatId: string;
    senderId: string;
}