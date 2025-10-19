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

export type BookCard = {
  total_record: number;
  total_view: number;
  total_download: number;
  total_tag: number;
};

export type SearchCard = {
  total_search: number;
  search_type: number;
  popular_search: number;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type SearchTrend= {
  date: string;
  count: number;
}

export type SearchType = {
  type: string;
  count: number;
};