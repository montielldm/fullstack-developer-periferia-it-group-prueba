export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  authorId: number;
  status: string;
  commentsCount: number;
  author: Author;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export interface PostCreation {
  title: string;
  content: string;
}