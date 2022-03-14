import { Title } from "@mantine/core";
import { Prism } from "@mantine/prism";
import React from "react";

const trainModelCode = `
export function trainPerceptron(
  data: [[number, number], number][],
  epochs = 1000
) {
  const perceptron = new Perceptron();

  for (let i = 0; i < epochs; i++) {
    for (const [input, output] of data) {
      perceptron.train(input, output);
    }
  }
}`;

const TrainModel: React.FC = () => {
  return (
    <>
      <Prism language="tsx" withLineNumbers>
        {trainModelCode}
      </Prism>
    </>
  );
};

export default TrainModel;
