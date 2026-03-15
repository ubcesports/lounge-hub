import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

async function proxyRequest(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname;
  const search = url.search;
  const destination = `${API_URL}/v1${path}${search}`;

  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (API_KEY) {
    headers.set("Authorization", `Bearer ${API_KEY}`);
  }

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.text()
      : undefined;

  const response = await fetch(destination, {
    method: req.method,
    headers,
    body,
  });

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
    },
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
