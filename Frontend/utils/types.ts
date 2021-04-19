export type Board = {
  abbr: string;
  name: string;
};

export type Thread = {
  id: string;
  title: string;
  board: string;
  postsCount: number;
  posts: Posts[];
};

export type Posts = {
  id: string;
  name: string;
  created: string;
  no: number;
  attachment: string;
};
