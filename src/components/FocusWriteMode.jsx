
import React, { useState, useEffect } from 'react';
import RichNoteEditor from './RichNoteEditor';

const FocusWriteMode = ({ task, isOpen, onClose, onUpdateNote, onUpdateLinks }) => {
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isDirectiveCopied, setIsDirectiveCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!isOpen || !task) return null;

  const links = task.links || [];

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;
    const formattedUrl = newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`;
    onUpdateLinks(task.id, [...links, formattedUrl]);
    setNewLinkUrl('');
  };

  const handleRemoveLink = (indexToRemove) => {
    onUpdateLinks(task.id, links.filter((_, idx) => idx !== indexToRemove));
  };

  const getDomainLabel = (url) => {
    try { return new URL(url).hostname.replace('www.', ''); } catch { return "Link"; }
  };

  const handleCopyDirective = async () => {
    if (!task.directive) return;
    try {
      await navigator.clipboard.writeText(task.directive);
      setIsDirectiveCopied(true);
      setTimeout(() => setIsDirectiveCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy directive', err);
    }
  };

// ============================================================================
// REAL-TIME GEMINI STREAMING API INTEGRATION
// ============================================================================

const handleGenerateAI = async () => {
  // Prevent duplicate generation / cooldown requests
  if (cooldown > 0 || isGenerating) return;

  // --------------------------------------------------------------------------
  // 1. Get Gemini API key
  // --------------------------------------------------------------------------
  const apiKey = localStorage.getItem("gemini_api_key");

  if (!apiKey) {
    const errorMsg =
      `> **Error:** No Gemini API Key found.\n\n` +
      `Please open the **Settings** menu (gear icon in the top right), ` +
      `enter your Gemini API key in the AI Configuration section, and save it.`;

    const existingNote = task.notes
      ? `${task.notes}\n\n---\n\n`
      : "";

    onUpdateNote(task.id, existingNote + errorMsg);
    return;
  }

  // --------------------------------------------------------------------------
  // 2. Start generation state
  // --------------------------------------------------------------------------
  setIsGenerating(true);

  let generatedText = "";

  const existingNote = task.notes
    ? `${task.notes}\n\n---\n\n`
    : "";

  try {
    // =========================================================================
    // 3. SYSTEM PROMPT
    // =========================================================================
    //
    // IMPORTANT:
    // This is sent using Gemini's `systemInstruction` field.
    // It is NOT mixed with the user's actual topic/question.
    //
    // =========================================================================

    const systemPrompt = `
You are an expert Principal Software Engineer, System Designer,
and Technical Mentor.

Your task is to generate premium, comprehensive, interview-focused
study notes for the requested software engineering topic.

The output will be streamed directly into a custom Markdown editor
called RichNoteEditor.

RichNoteEditor supports:

- GitHub Flavored Markdown (GFM)
- KaTeX / LaTeX
- Mermaid diagrams
- Syntax-highlighted code blocks
- HTML/SVG

============================================================
STRICT OUTPUT RULES
============================================================

1. START DIRECTLY WITH A MAIN HEADING

The response MUST begin directly with:

# Topic Name

Do NOT write:

- Sure!
- Here are your notes.
- Let's understand this.
- Absolutely!
- Any other conversational introduction.

============================================================
2. CORE CONCEPT

Immediately after the main heading, provide a concise summary:

> Core concept / interview takeaway

============================================================
3. MARKDOWN STRUCTURE

Use:

# Main Topic
## Major Section
### Subsection
#### Detail

Do not skip heading levels unnecessarily.

============================================================
4. MERMAID DIAGRAMS

Use Mermaid when a diagram materially improves understanding.

For these topics, include Mermaid whenever appropriate:

- System Design
- Software Architecture
- Distributed Systems
- Database Schemas
- UML
- Design Patterns
- Microservices
- Request / Data Flow

Use valid Mermaid syntax.

Example:

\`\`\`mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Service]
    C --> D[(Database)]
\`\`\`

For UML:

\`\`\`mermaid
classDiagram
    class PaymentService {
        +processPayment()
    }

    class PaymentGateway {
        <<interface>>
        +pay()
    }

    PaymentService --> PaymentGateway
\`\`\`

IMPORTANT:

- Close every Mermaid code block.
- Do not put Markdown inside Mermaid nodes.
- Do not use JSX inside Mermaid.
- Keep Mermaid syntax parser-safe.

============================================================
5. SVG

Use raw SVG only when Mermaid cannot represent the required
visual effectively.

Every SVG tag must be properly closed.

Never output React JSX such as:

<text className="...">

Never output custom React components.

If Mermaid can represent the visual, prefer Mermaid.

============================================================
6. MATHEMATICS

Use KaTeX / LaTeX for mathematical formulas.

Inline:

$O(N)$

Block:

$$
T(N) = O(N \\log N)
$$

All Time Complexity and Space Complexity MUST use LaTeX.

Example:

Time Complexity: $O(N \\log N)$

Space Complexity: $O(N)$

============================================================
7. CODE BLOCKS

Every code block MUST specify its language.

Example:

\`\`\`java
public class Solution {
    public int solve(int[] nums) {
        return 0;
    }
}
\`\`\`

Never provide executable code outside a code block.

If the user requests Java:

- Provide Java only.
- Do not provide C++.
- Do not provide Python.
- Do not provide JavaScript.

============================================================
8. MARKDOWN TABLES

Use Markdown tables for:

- Comparisons
- Trade-offs
- Technology differences
- Algorithm comparisons
- Architecture decisions

Example:

| Feature | Option A | Option B |
|---|---|---|
| Complexity | $O(N)$ | $O(\log N)$ |
| Use Case | ... | ... |

Always include a header row.

============================================================
9. TYPOGRAPHY

Use:

**bold**

for important concepts.

Use:

\`inline code\`

for:

- classes
- methods
- variables
- APIs
- annotations
- filenames
- commands

============================================================
10. DSA FORMAT

For Data Structures & Algorithms problems, prefer:

# Problem Name

> Core concept

## 1. Problem

## 2. Examples

## 3. Constraints

## 4. Brute Force Approach

## 5. Optimal Approach

## 6. Algorithm

## 7. Implementation

## 8. Dry Run

## 9. Complexity Analysis

## 10. Edge Cases

## 11. Interview Questions

## 12. Interview-Ready Explanation

============================================================
11. SYSTEM DESIGN FORMAT

For System Design questions, include:

## 1. Requirements

### Functional Requirements

### Non-Functional Requirements

## 2. Scale Estimation

## 3. High-Level Architecture

Include Mermaid.

## 4. Core Components

## 5. Request / Data Flow

Include Mermaid sequence diagram when useful.

## 6. Database Design

## 7. Scalability

## 8. Reliability

## 9. Caching

## 10. Consistency

## 11. Failure Scenarios

## 12. Trade-offs

## 13. Interview Questions

## 14. Interview-Ready Summary

============================================================
12. DESIGN PATTERNS

For Design Patterns include:

## 1. Problem

## 2. Why This Pattern?

## 3. Core Idea

## 4. Structure

Use Mermaid classDiagram when useful.

## 5. Implementation

## 6. How It Works

## 7. Real-World Example

## 8. Advantages

## 9. Disadvantages

## 10. When to Use

## 11. When Not to Use

## 12. Interview Questions

## 13. Interview-Ready Explanation

============================================================
13. INTERVIEW FOCUS

Explain concepts at an SDE2 / Senior Software Engineer level.

When appropriate, include:

- Internal working
- Real-world usage
- Trade-offs
- Common mistakes
- Edge cases
- Interview follow-up questions

============================================================
14. INTERVIEW-READY ANSWER

For important topics, provide:

## Interview-Ready Explanation

> A concise explanation that a candidate can naturally speak
> during an interview.

============================================================
15. TECHNICAL ACCURACY

Do not:

- Invent APIs.
- Invent framework behavior.
- Claim incorrect complexity.
- Provide code that contradicts the explanation.
- Use invalid Mermaid syntax.
- Use invalid KaTeX syntax.
- Use invalid Markdown fences.

============================================================
16. RICHNOTEEDITOR COMPATIBILITY

The final output will be streamed directly into RichNoteEditor.

Therefore:

- Use standard Markdown.
- Close every code fence.
- Close every Mermaid block.
- Close every SVG tag.
- Do not output React JSX.
- Do not output <Markdown>.
- Do not output unsupported custom components.
- Do not output HTML that could break the Markdown renderer.

============================================================
17. MULTI-QUESTION RULE

If multiple questions are provided, solve ONLY the first question.

Do not solve subsequent questions until the user says:

Next

============================================================
18. QUALITY PRIORITY

Prioritize:

Accuracy
>
Clarity
>
Interview Value
>
Structure
>
Visual Understanding
>
Conciseness

============================================================

Generate ONLY the final study notes.
`.trim();

    // =========================================================================
    // 4. USER PROMPT
    // =========================================================================

    const userPrompt = `
Topic:
${task.topic}

Directive:
${task.directive}

Generate the study notes according to the system instructions.
`.trim();

    // =========================================================================
    // 5. GEMINI MODEL
    // =========================================================================

    const model = "gemini-3.8-flash";

    // =========================================================================
    // 6. STREAMING ENDPOINT
    // =========================================================================
    //
    // IMPORTANT:
    //
    // generateContent
    //      = normal response
    //
    // streamGenerateContent?alt=sse
    //      = Server-Sent Events streaming response
    //
    // =========================================================================

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${model}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

    // =========================================================================
    // 7. CALL GEMINI
    // =========================================================================

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        // --------------------------------------------------------------
        // SYSTEM INSTRUCTION
        // --------------------------------------------------------------
        systemInstruction: {
          parts: [
            {
              text: systemPrompt,
            },
          ],
        },

        // --------------------------------------------------------------
        // USER REQUEST
        // --------------------------------------------------------------
        contents: [
          {
            role: "user",
            parts: [
              {
                text: userPrompt,
              },
            ],
          },
        ],

        // --------------------------------------------------------------
        // GENERATION CONFIG
        // --------------------------------------------------------------
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
          maxOutputTokens: 16384,
        },
      }),
    });

    // =========================================================================
    // 8. HANDLE HTTP ERROR
    // =========================================================================

    if (!response.ok) {
      let errorMessage =
        `Gemini API request failed with status ${response.status}`;

      try {
        const errorData = await response.json();

        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(errorMessage);
    }

    // =========================================================================
    // 9. VERIFY STREAM
    // =========================================================================

    if (!response.body) {
      throw new Error("Gemini returned no streaming response body.");
    }

    // =========================================================================
    // 10. CREATE STREAM READER
    // =========================================================================

    const reader = response.body.getReader();

    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    // =========================================================================
    // 11. READ STREAM
    // =========================================================================

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      if (!value) {
        continue;
      }

      // Decode incoming bytes
      buffer += decoder.decode(value, {
        stream: true,
      });

      // --------------------------------------------------------------
      // SSE events are separated by blank lines.
      // --------------------------------------------------------------

      const events = buffer.split(/\r?\n\r?\n/);

      // Keep the incomplete event for the next network chunk
      buffer = events.pop() || "";

      // --------------------------------------------------------------
      // Process completed SSE events
      // --------------------------------------------------------------

      for (const event of events) {
        const lines = event.split(/\r?\n/);

        for (const line of lines) {
          // Ignore non-data SSE lines
          if (!line.startsWith("data:")) {
            continue;
          }

          const jsonString = line.slice(5).trim();

          if (!jsonString || jsonString === "[DONE]") {
            continue;
          }

          try {
            const chunk = JSON.parse(jsonString);

            // ----------------------------------------------------------
            // Extract text from Gemini streaming response
            // ----------------------------------------------------------

            const textChunk =
              chunk?.candidates?.[0]?.content?.parts
                ?.map((part) => part?.text || "")
                .join("");

            if (!textChunk) {
              continue;
            }

            // ----------------------------------------------------------
            // Append incoming token/chunk
            // ----------------------------------------------------------

            generatedText += textChunk;

            // ----------------------------------------------------------
            // STREAM DIRECTLY INTO RICHNOTEEDITOR
            // ----------------------------------------------------------
            //
            // This updates the note after every Gemini chunk.
            //
            // Existing note remains untouched.
            //
            // ----------------------------------------------------------

            onUpdateNote(
              task.id,
              existingNote + generatedText
            );
          } catch (parseError) {
            console.warn(
              "Could not parse Gemini stream event:",
              parseError,
              jsonString
            );
          }
        }
      }
    }

    // =========================================================================
    // 12. FLUSH REMAINING DECODER DATA
    // =========================================================================

    buffer += decoder.decode();

    // =========================================================================
    // 13. PROCESS FINAL BUFFER
    // =========================================================================

    if (buffer.trim()) {
      const finalLines = buffer.split(/\r?\n/);

      for (const line of finalLines) {
        if (!line.startsWith("data:")) {
          continue;
        }

        const jsonString = line.slice(5).trim();

        if (!jsonString || jsonString === "[DONE]") {
          continue;
        }

        try {
          const chunk = JSON.parse(jsonString);

          const textChunk =
            chunk?.candidates?.[0]?.content?.parts
              ?.map((part) => part?.text || "")
              .join("");

          if (textChunk) {
            generatedText += textChunk;

            onUpdateNote(
              task.id,
              existingNote + generatedText
            );
          }
        } catch (parseError) {
          console.warn(
            "Could not parse final Gemini stream event:",
            parseError
          );
        }
      }
    }

    // =========================================================================
    // 14. EMPTY RESPONSE CHECK
    // =========================================================================

    if (!generatedText.trim()) {
      throw new Error(
        "Gemini completed the request but returned no text."
      );
    }

  } catch (error) {
    // =========================================================================
    // 15. ERROR HANDLING
    // =========================================================================

    console.error("AI Generation failed:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error occurred.";

    const errorMsg =
      `> **Error:** AI generation failed.\n\n` +
      `Please check your network connection and verify your Gemini API key.\n\n` +
      `\`${errorMessage}\``;

    onUpdateNote(
      task.id,
      existingNote +
        generatedText +
        "\n\n" +
        errorMsg
    );

  } finally {
    // =========================================================================
    // 16. CLEANUP
    // =========================================================================

    setIsGenerating(false);

    // 3-minute cooldown
    setCooldown(180);
  }
};


  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-8 bg-slate-900/95 sm:bg-slate-900/90 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="relative bg-white dark:bg-slate-950 w-full max-w-5xl h-full sm:h-[95vh] rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden sm:border border-slate-200/80 dark:border-slate-800 animate-fade-in-up">
        
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        <div className="relative flex items-center justify-between p-4 md:px-6 md:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                  Focus Write Mode
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                <span className="text-[9px] md:text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  {task.dayLabel}
                </span>
              </div>
              <h2 className="text-lg md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                {task.topic}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="group flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white active:scale-95">
            <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-slate-50/50 dark:bg-slate-950 w-full max-w-full min-w-0">
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            
            <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 dark:border-indigo-900/30 dark:from-indigo-950/30 dark:to-violet-950/10 group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />
              
              <button 
                onClick={handleCopyDirective}
                className="absolute top-4 right-4 flex items-center justify-center p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95 backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                title="Copy Question"
              >
                {isDirectiveCopied ? (
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
              </button>

              <div className="p-4 md:p-5 pl-5 md:pl-6 pr-14">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">Focus Directive</span>
                </div>
                <blockquote className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed italic break-words">
                  {task.directive}
                </blockquote>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">Resources & References</h3>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <form onSubmit={handleAddLink} className="flex gap-2 mb-4 w-full max-w-full group">
                <input type="url" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="Paste external URL here..." className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-slate-800 dark:text-slate-200 transition-all min-w-0 shadow-sm" />
                <button type="submit" className="px-5 py-2.5 bg-slate-800 dark:bg-slate-700 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shrink-0 shadow-sm active:scale-95">Add Link</button>
              </form>
              
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full max-w-full min-w-0">
                  {links.map((link, idx) => (
                    <div key={idx} className="group/pill inline-flex items-center gap-1.5 px-1.5 py-1.5 pr-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all max-w-full min-w-0">
                      <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 truncate flex-1 min-w-0 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></span>
                        <span className="truncate text-slate-700 dark:text-slate-300">{getDomainLabel(link)}</span>
                      </a>
                      <button onClick={() => handleRemoveLink(idx)} className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 pb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <h3 className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.16em]">Workspace</h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                </div>

                <button 
                  onClick={handleGenerateAI}
                  disabled={isGenerating || cooldown > 0}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg shrink-0 ${
                    isGenerating || cooldown > 0 
                      ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed shadow-none opacity-80' 
                      : 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-95 shadow-indigo-500/25'
                  }`}
                >
                  {isGenerating ? (
                    <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : cooldown > 0 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                  {isGenerating ? 'Generating...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Generate AI Notes'}
                </button>
              </div>
              
              <RichNoteEditor initialNote={task.notes} onSave={(text) => onUpdateNote(task.id, text)} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusWriteMode;