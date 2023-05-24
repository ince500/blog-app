export interface Post {
  id: number;
  date: Date;
  message: string;
  media: string[];
  author: number; // ID пользователя
}
