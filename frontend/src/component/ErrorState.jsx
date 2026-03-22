import { FileText } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#f7fafa] px-4">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-[0px_10px_30px_rgba(239,68,68,0.08)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <FileText className="text-red-500" size={28} />
        </div>

        <h3 className="mt-5 text-xl font-extrabold text-slate-900">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#006565] to-[#008080] px-5 py-3 text-sm font-bold text-white shadow-[0px_4px_20px_rgba(0,101,101,0.12)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
