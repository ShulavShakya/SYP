export default function PageLoader({ caption = "Loading..." }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-[#f7fafa] px-6 text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-primary" />
      <p className="mt-4 text-sm font-semibold text-slate-600">{caption}</p>
    </div>
  );
}
