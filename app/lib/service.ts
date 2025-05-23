export function queryBook(term, page): Promise<{ data; message: string; totalPages }> {
  if (term === '') {
    // todo term
    return fetch(`/api/get-book?term=&page=${page}`, {
      cache: 'force-cache',
    }).then((res) => res.json());
  }
  return fetch('/api/ai-search', { method: 'POST', body: JSON.stringify({ prompt: term }) }).then((res) =>
    res.json()
  );
}
