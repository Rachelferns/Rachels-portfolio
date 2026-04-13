import { NextRequest, NextResponse } from "next/server";
import { runPromptEngine, type PromptRequest } from "@/lib/prompt-engine";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<PromptRequest>;

  if (!body.userInput || !body.template) {
    return NextResponse.json(
      { message: "Both userInput and template are required." },
      { status: 400 }
    );
  }

  const result = runPromptEngine({
    userInput: body.userInput,
    template: body.template
  });

  return NextResponse.json(result);
}
