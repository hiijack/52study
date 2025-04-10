export default function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2">
      <div className="p-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{value}</p>
    </div>
  );
}
