import Book from './book';

const BookRender = (props) => {
  const { data } = props;
  const books = JSON.parse(data);
  if (books.length === 0) {
    return <p className="text-center p-8 text-gray-600 dark:text-gray-400">暂无相关书籍</p>;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-white/20">
      {books.map((d) => (
        <Book key={d.id} {...d} />
      ))}
    </div>
  );
};

const SearchResult = (props) => {
  const { data } = props;
  const assistant = data[0];
  const tool = data[1];
  if (assistant?.content[0].type === 'text') {
    return <div className="text-gray-600">{assistant.content[0].text}</div>;
  } else if (assistant?.content[0].type === 'tool-call') {
    return <BookRender data={tool.content[0].result.content[0].text} />;
  }
  return null;
};

export default SearchResult;
