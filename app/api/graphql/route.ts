import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

async function handleRequest(req: NextRequest): Promise<NextResponse> {
  const auth = req.headers.get("authorization") || "";
  const token = getTokenFromHeader(auth);
  let context = {};
  if (token) {
    const payload = verifyToken(token);
    if (payload) context = { userId: payload.userId, email: payload.email };
  }

  const body = await req.json();

  const result = await server.executeOperation(
    { query: body.query, variables: body.variables, operationName: body.operationName },
    { contextValue: context }
  );

  const responseBody = result.body;

  if (responseBody.kind === "single") {
    return NextResponse.json(responseBody.singleResult, { status: 200 });
  }

  // incremental response: collect subsequentResults
  if (responseBody.kind === "incremental") {
    const chunks: object[] = [responseBody.initialResult];
    for await (const chunk of responseBody.subsequentResults) {
      chunks.push(chunk);
    }
    return NextResponse.json(chunks[0] ?? {}, { status: 200 });
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}
