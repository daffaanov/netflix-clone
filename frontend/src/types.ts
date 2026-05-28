export type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
};

export type AuthState = {
  token: string;
  user: User;
};

export type AuthFormState = {
  fullName: string;
  email: string;
  password: string;
};

export type MediaItem = {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
};

export type TmdbResponse = {
  results?: MediaItem[];
};
