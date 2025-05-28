/**
 * OpenAI Codex integration utilities for TalentScout
 * This file provides functions for interacting with the OpenAI API,
 * specifically for code-related tasks using the Codex model.
 */

import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create OpenAI API instance
const openai = new OpenAIApi(configuration);

/**
 * Generate code completions using OpenAI Codex
 * @param prompt The code prompt to complete
 * @param options Additional options for the completion
 * @returns The generated code completion
 */
export async function generateCodeCompletion(
  prompt: string,
  options: {
    maxTokens?: number;
    temperature?: number;
    language?: string;
  } = {}
) {
  try {
    const { maxTokens = 500, temperature = 0.7, language = 'javascript' } = options;
    
    const response = await openai.createCompletion({
      model: 'code-davinci-002', // Codex model
      prompt: language ? `// ${language}\n${prompt}` : prompt,
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error generating code completion:', error);
    throw error;
  }
}

/**
 * Analyze code for bugs or improvements
 * @param code The code to analyze
 * @param language The programming language
 * @returns Analysis results with suggestions
 */
export async function analyzeCode(code: string, language: string) {
  try {
    const prompt = `
# Code Analysis
The following ${language} code needs to be analyzed for bugs, performance issues, and potential improvements:

\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Potential bugs or issues
2. Performance improvements
3. Code quality suggestions

Analysis:
`;

    const response = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt,
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
}

/**
 * Generate unit tests for code
 * @param code The code to generate tests for
 * @param language The programming language
 * @param framework The testing framework (e.g., 'jest', 'mocha')
 * @returns Generated unit tests
 */
export async function generateUnitTests(
  code: string,
  language: string,
  framework: string = 'jest'
) {
  try {
    const prompt = `
# Generate Unit Tests
Write unit tests for the following ${language} code using ${framework}:

\`\`\`${language}
${code}
\`\`\`

Unit Tests:
`;

    const response = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt,
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error generating unit tests:', error);
    throw error;
  }
}
