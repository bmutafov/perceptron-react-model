import { Perceptron } from "./Perceptron.class";

export function trainPerceptron(
  data: [[number, number], number][],
  epochs = 1000,
  perceptron: Perceptron
) {
  for (let i = 0; i < epochs; i++) {
    for (const [input, output] of data) {
      perceptron.train(input, output);
    }
  }
}
