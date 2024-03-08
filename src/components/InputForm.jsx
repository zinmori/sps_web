export default function InputForm({ children }) {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4 bg-slate-300 rounded-md p-4 m-4 w-4/5">
      {children}
    </div>
  );
}
