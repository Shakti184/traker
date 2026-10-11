import { useState, useEffect } from 'react';

import { buildSystemPrompt } from '../prompts/systemPrompt';

const useGeminiStream = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Manage anti-spam cooldown timer
  useEffect(() => {
    let timer;

    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [cooldown]);

  const generateAIResponse = async (
    task,
    userMessage,
    onUpdateNote,
    onComplete
  ) => {
    // Prevent duplicate generation / cooldown requests
    if (cooldown > 0 || isGenerating) return;

    // --------------------------------------------------------------------------
    // 1. Get Gemini API key
    // --------------------------------------------------------------------------

    const apiKey = localStorage.getItem('gemini_api_key');

    if (!apiKey) {
      const errorMsg =
        `> **Error:** No Gemini API Key found.\n\n` +
        `Please open the **Settings** menu (gear icon in the top right), ` +
        `enter your Gemini API key in the AI Configuration section, and save it.`;

      const existingNote = task.notes
        ? `${task.notes}\n\n---\n\n`
        : '';

      onUpdateNote(task.id, existingNote + errorMsg);
      return;
    }

    // --------------------------------------------------------------------------
    // 2. Build phase-specific system prompt
    // --------------------------------------------------------------------------

    const systemPrompt = buildSystemPrompt(task.phaseId);

    // --------------------------------------------------------------------------
    // 3. Start generation state
    // --------------------------------------------------------------------------

    setIsGenerating(true);

    let generatedText = '';

    // If the user sends an empty message and notes already exist,
    // treat it as a request for the next question/step.
    const msg =
      userMessage?.trim() || (task.notes ? 'Next' : '');

    const chatSeparator = task.notes
      ? `\n\n---\n\n> **Follow-up:** ${msg}\n\n`
      : '';

    const existingNote = task.notes
      ? task.notes + chatSeparator
      : '';

    try {
      // ------------------------------------------------------------------------
      // 4. Build multi-turn context
      // ------------------------------------------------------------------------

      const apiContents = [];

      if (task.notes && task.notes.trim() !== '') {
        // Previous task context
        apiContents.push({
          role: 'user',
          parts: [
            {
              text:
                `Topic: ${task.topic}\n` +
                `Directive: ${task.directive || ''}`,
            },
          ],
        });

        // Previous AI response
        apiContents.push({
          role: 'model',
          parts: [
            {
              text: task.notes,
            },
          ],
        });

        // Current user request
        apiContents.push({
          role: 'user',
          parts: [
            {
              text: msg,
            },
          ],
        });
      } else {
        // First generation request
        const userPrompt = [
          `Topic:`,
          task.topic,
          '',
          `Directive:`,
          task.directive || '',
          msg ? `\nUser Request:\n${msg}` : '',
        ]
          .join('\n')
          .trim();

        apiContents.push({
          role: 'user',
          parts: [
            {
              text: userPrompt,
            },
          ],
        });
      }

      // ------------------------------------------------------------------------
      // 5. Gemini model & endpoint
      // ------------------------------------------------------------------------

      const model = 'gemini-3.8-flash';

      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/` +
        `${model}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

      // ------------------------------------------------------------------------
      // 6. Call Gemini
      // ------------------------------------------------------------------------

      const response = await fetch(url, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },

          contents: apiContents,

          generationConfig: {
            temperature: 0.3,
            topP: 0.9,
            maxOutputTokens: 16384,
          },
        }),
      });

      // ------------------------------------------------------------------------
      // 7. Handle HTTP error
      // ------------------------------------------------------------------------

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

      // ------------------------------------------------------------------------
      // 8. Verify stream & create reader
      // ------------------------------------------------------------------------

      if (!response.body) {
        throw new Error(
          'Gemini returned no streaming response body.'
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';

      // ------------------------------------------------------------------------
      // 9. Read stream and parse SSE events
      // ------------------------------------------------------------------------

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;
        if (!value) continue;

        // Decode incoming bytes
        buffer += decoder.decode(value, {
          stream: true,
        });

        // SSE events are separated by blank lines
        const events = buffer.split(/\r?\n\r?\n/);

        // Keep incomplete event
        buffer = events.pop() || '';

        for (const event of events) {
          const lines = event.split(/\r?\n/);

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;

            const jsonString = line.slice(5).trim();

            if (
              !jsonString ||
              jsonString === '[DONE]'
            ) {
              continue;
            }

            try {
              const chunk = JSON.parse(jsonString);

              const textChunk =
                chunk?.candidates?.[0]?.content?.parts
                  ?.map((part) => part?.text || '')
                  .join('');

              if (!textChunk) continue;

              generatedText += textChunk;

              // Stream directly into RichNoteEditor
              onUpdateNote(
                task.id,
                existingNote + generatedText
              );
            } catch (parseError) {
              console.warn(
                'Could not parse Gemini stream event:',
                parseError,
                jsonString
              );
            }
          }
        }
      }

      // ------------------------------------------------------------------------
      // 10. Flush remaining decoder data
      // ------------------------------------------------------------------------

      buffer += decoder.decode();

      if (buffer.trim()) {
        const finalLines = buffer.split(/\r?\n/);

        for (const line of finalLines) {
          if (!line.startsWith('data:')) continue;

          const jsonString = line.slice(5).trim();

          if (
            !jsonString ||
            jsonString === '[DONE]'
          ) {
            continue;
          }

          try {
            const chunk = JSON.parse(jsonString);

            const textChunk =
              chunk?.candidates?.[0]?.content?.parts
                ?.map((part) => part?.text || '')
                .join('');

            if (textChunk) {
              generatedText += textChunk;

              onUpdateNote(
                task.id,
                existingNote + generatedText
              );
            }
          } catch (parseError) {
            console.warn(
              'Could not parse final Gemini stream event:',
              parseError
            );
          }
        }
      }

      // ------------------------------------------------------------------------
      // 11. Validate generated output
      // ------------------------------------------------------------------------

      if (!generatedText.trim()) {
        throw new Error(
          'Gemini completed the request but returned no text.'
        );
      }
    } catch (error) {
      console.error('AI Generation failed:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred.';

      const errorMsg =
        `> **Error:** AI generation failed.\n\n` +
        `Please check your network connection and verify your Gemini API key.\n\n` +
        `\`${errorMessage}\``;

      onUpdateNote(
        task.id,
        existingNote +
          generatedText +
          '\n\n' +
          errorMsg
      );
    } finally {
      setIsGenerating(false);

      // 30-second cooldown
      setCooldown(30);

      if (onComplete) {
        onComplete();
      }
    }
  };

  return {
    isGenerating,
    cooldown,
    generateAIResponse,
  };
};

export default useGeminiStream;
