import { Title } from "@mantine/core";
import { Prism } from "@mantine/prism";

const perceptronCode = `
export class Perceptron {
  /** For presentational and testing reasons */
  public perceptronName: string = "Perceptron";

  /** Perceptrons characteristics */
  public bias: number;
  public weights: number[];
  private learningRate = 0.1;

  /** Create perceptron with 2 random weights and 1 random bias */
  constructor(perceptronName?: string) {
    if (perceptronName) {
      this.perceptronName = perceptronName;
    }

    this.bias = Math.random() * 2 - 1;
    this.weights = Array.from({ length: 2 }).map((i) => Math.random() * 2 - 1);
  }

  /**
   * Implement the Guess function:
   * it should, depending on the input, weights and bias produce an output:
   * - 1 if the perceptron is activated
   * - -1 if the perceptron is not activated
   */
  public guess(input: number[]) {
    let sum = this.bias;
    /** Iterate through the inputs and calculate the sum */
    for (let i = 0; i < input.length; i++) {
      sum += this.weights[i] * input[i];
    }

    /** Return the result, based on a function of the sum (implemented bellow) */
    return this.f(sum);
  }

  /**
   * Train the model.
   * It will adjust its weight and bias for every invokation of this function.
   */
  public train(inputs: number[], target: number) {
    /**
     * Guess with the provided inputs
     * Output is 1 or -1
     */
    const guess = this.guess(inputs);

    /** Error diff of the current guess to target */
    const error = target - guess;

    /** If there was an error, adjust the weights and bias */
    if (error !== 0) {
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] =
          this.weights[i] + error * inputs[i] * this.learningRate;
      }
      this.bias += error * this.learningRate;
    }
  }

  /**
   * Function of the sum,
   * returns -1 if sum is lower than 0
   * or 1 if the sum is greater than 0
   **/
  private f(x: number) {
    return x < 0 ? -1 : 1;
  }
}
`;

export const PerceptronCodeHighlight = (): React.ReactElement => {
  return (
    <>
      <Prism language="tsx" withLineNumbers>
        {perceptronCode}
      </Prism>
    </>
  );
};
