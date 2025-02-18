import type { ReactNode } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { usePagination } from "./hook";

const mockResponse200 = {
  data: {
    offset: 120,
    limit: 40,
    count: 40,
    total: 1564,
    results: [
      {
        id: 1009181,
        name: "Big Wheel",
        description: "",
        modified: "2012-12-27T15:37:56-0500",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/3/00/4c0040b26877d",
          extension: "jpg",
        },
      },
    ],
  },
};

const server = setupServer(
  http.get("https://gateway.marvel.com/v1/public/characters", () => {
    return HttpResponse.json(mockResponse200, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Given that the API return a 200 code response, usePagination hook", () => {
  it("isSuccess returned value should be true", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () => {
        return usePagination({ limit: 1, page: 1 });
      },
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("should return the correct formated data", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () => {
        return usePagination({ limit: 1, page: 1 });
      },
      { wrapper }
    );

    const expectedData = [
      {
        id: 1009181,
        name: "Big Wheel",
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/00/4c0040b26877d",
          extension: "jpg",
        },
      },
    ];

    await waitFor(() => expect(result.current.data).toHaveLength(1));
    expect(result.current.data).toEqual(expectedData);
  });
});

describe("Given that the API return a 400 code response, usePagination hook", () => {
  it("isSuccess returned value  should be false", async () => {
    server.use(
      http.get("https://gateway.marvel.com/v1/public/characters", () => {
        return HttpResponse.json({}, { status: 400 });
      })
    );

    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () => {
        return usePagination({ limit: 1, page: 1 });
      },
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
