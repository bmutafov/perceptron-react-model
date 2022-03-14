import { Prism } from "@mantine/prism";
import React from "react";

const testDataCode = `
export function test(
  testSet: [[number, number], number][],
  perceptron: Perceptron
) {
  const testResults = testSet.map(([input, expectedResult]) => {
    const result = perceptron.guess(input);

    return {
      result: result === expectedResult,
      log: \`input: \${input}, output: \${result}, expected: \${expectedResult}\`,
    };
  });

  return testResults;
}
`;

const TestData: React.FC = () => {
  return (
    <>
      <Prism language="tsx" withLineNumbers>
        {testDataCode}
      </Prism>
    </>
  );
};

export default TestData;
