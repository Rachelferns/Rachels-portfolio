export type PromptTemplate = "Q&A" | "Code Generation" | "Summarization";

export type PromptRequest = {
  userInput: string;
  template: PromptTemplate;
};

export type PromptResult = {
  originalInput: string;
  optimizedPrompt: string;
  outputResponse: string;
  comparison: {
    before: string;
    after: string;
  };
  suggestions: string[];
};

const templateGuides: Record<
  PromptTemplate,
  {
    role: string;
    objective: string;
    structure: string[];
    outputPrefix: string;
  }
> = {
  "Q&A": {
    role: "You are a precise subject-matter tutor.",
    objective: "Answer the question accurately using short explanations and clearly separated steps.",
    structure: [
      "Restate the problem in one sentence.",
      "Answer directly.",
      "Add 2-3 supporting points or examples.",
      "Close with one practical takeaway."
    ],
    outputPrefix: "Answer"
  },
  "Code Generation": {
    role: "You are an expert software engineer.",
    objective: "Generate maintainable code, explain the logic briefly, and call out assumptions.",
    structure: [
      "Identify the programming goal and expected language or framework.",
      "Produce a clean solution.",
      "Explain key logic decisions.",
      "Mention edge cases and next improvements."
    ],
    outputPrefix: "Generated Solution"
  },
  Summarization: {
    role: "You are an analytical editor.",
    objective: "Convert the source into a concise summary without losing the core message.",
    structure: [
      "Identify the primary topic.",
      "Summarize the essential points in clear bullet-friendly prose.",
      "Highlight any actionable outcomes or conclusions."
    ],
    outputPrefix: "Refined Summary"
  }
};

function buildOptimizedPrompt({ userInput, template }: PromptRequest) {
  const guide = templateGuides[template];

  return [
    guide.role,
    `Task Type: ${template}`,
    `Objective: ${guide.objective}`,
    "Instructions:",
    ...guide.structure.map((step, index) => `${index + 1}. ${step}`),
    `User Request: """${userInput.trim()}"""`,
    "Response Rules:",
    "1. Keep the output focused and well-structured.",
    "2. Use a helpful tone.",
    "3. Avoid vague filler and make assumptions explicit."
  ].join("\n");
}

function buildPreviewOutput({ userInput, template }: PromptRequest) {
  const cleanInput = userInput.trim();

  switch (template) {
    case "Q&A":
      return `Question focus: ${cleanInput}\n\nDirect answer: The improved prompt asks for a precise explanation, short supporting points, and a practical takeaway, so the output becomes easier to study and present.\n\nWhy it is better:\n- The response becomes structured instead of conversational.\n- Key points are easier to scan.\n- The final takeaway makes revision faster.`;
    case "Code Generation":
      return `Solution overview: ${cleanInput}\n\nGenerated approach:\n- Define the expected input and output.\n- Implement the main logic with readable structure.\n- Explain assumptions and edge cases.\n\nThis optimized prompt produces code that is easier to review, demo, and extend in a submission setting.`;
    case "Summarization":
      return `Summary target: ${cleanInput}\n\nRefined summary:\nThe optimized prompt narrows the task to the central theme, key supporting ideas, and actionable conclusion. That produces a cleaner summary that keeps important information while removing unnecessary wording.`;
    default:
      return cleanInput;
  }
}

function buildComparison({ userInput, optimizedPrompt }: { userInput: string; optimizedPrompt: string }) {
  return {
    before: userInput,
    after: optimizedPrompt
  };
}

function buildSuggestions(template: PromptTemplate) {
  switch (template) {
    case "Q&A":
      return [
        "Mention the subject area if the question is academic.",
        "Specify the expected answer length.",
        "Ask for examples if you want demonstration-oriented output."
      ];
    case "Code Generation":
      return [
        "Include the target language or framework.",
        "Define edge cases or constraints explicitly.",
        "Mention whether you need explanation, tests, or deployment notes."
      ];
    case "Summarization":
      return [
        "State the intended audience such as student, manager, or researcher.",
        "Mention the desired summary size.",
        "Ask for key takeaways if you need presentation-ready output."
      ];
  }
}

export function runPromptEngine(request: PromptRequest): PromptResult {
  const optimizedPrompt = buildOptimizedPrompt(request);

  return {
    originalInput: request.userInput,
    optimizedPrompt,
    outputResponse: buildPreviewOutput(request),
    comparison: buildComparison({
      userInput: request.userInput,
      optimizedPrompt
    }),
    suggestions: buildSuggestions(request.template)
  };
}
