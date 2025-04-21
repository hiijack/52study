export default function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-gray-100 p-2">
      <div className="p-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white p-4 text-center text-2xl">{value}</p>
    </div>
  );
}
