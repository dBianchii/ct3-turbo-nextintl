import { Suspense } from "react";

import { getTranslations } from "@acme/locales/next-intl/server";

import { api, HydrateClient } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  PostCardSkeleton,
  PostList,
  ThrowErrorForm,
} from "./_components/error-form";

export const runtime = "edge";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  void api.post.all.prefetch();

  const t = await getTranslations();

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            {t("HomePage.title")}
          </h1>
          <AuthShowcase />

          <ThrowErrorForm />
          <div className="w-full max-w-2xl overflow-y-scroll">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </div>
              }
            >
              <PostList />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
