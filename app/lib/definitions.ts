export type Book = {
  id: string;
  name: string;
  tag: string[];
  description: string;
  view_count: number;
  download_count: number;
  download_url: string;
  date: string;
};

export type Card = {
  total_record: number;
  total_view: number;
  total_download: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}