import { Perceptron } from "./Perceptron.class";

export function test(
  testSet: [[number, number], number][],
  perceptron: Perceptron
) {
  const testResults = testSet.map(([input, expectedResult]) => {
    const result = perceptron.guess(input);

    return {
      result: result === expectedResult,
      log: `input: ${input}, output: ${result}, expected: ${expectedResult}`,
    };
  });

  return testResults;
}
