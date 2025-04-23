export default function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-gray-700 p-2">
      <div className="pb-2">
        <h3 className="text-center text-sm font-medium text-black dark:text-white">{title}</h3>
      </div>
      <p className="rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white p-4 text-center text-2xl font-serif">{value}</p>
    </div>
  );
}
