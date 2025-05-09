export function queryBook(term, page): Promise<{ data; message: string; totalPages }> {
  if (term === '') {
    return fetch(`/api/get-book?term=${term}&page=${page}`).then((res) => res.json());
  }
  return fetch('/api/ai-search', { method: 'POST', body: JSON.stringify({ prompt: term }) }).then((res) =>
    res.json()
  );
}
