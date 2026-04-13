import type { NextPageContext } from "next";

type ErrorPageProps = {
  statusCode?: number;
};

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-[32px] border border-violet-100 bg-white/90 px-8 py-10 text-center shadow-[0_24px_60px_rgba(76,29,149,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-600">
          Prompt Engine
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {statusCode ? `Error ${statusCode}` : "Something went wrong"}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
          A fallback error page is available for production builds and deployment.
        </p>
      </div>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};
