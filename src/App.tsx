import { Container, Divider, Paper, Title } from "@mantine/core";
import { PerceptronCodeHighlight } from "./components/CodeHighlight/Perceptron";
import TestData from "./components/CodeHighlight/TestData";
import TrainModel from "./components/CodeHighlight/TrainModel";
import DataInput from "./components/Inputs/DataInput";

const SPACING = 20;

function App() {
  return (
    <Container>
      <Paper mt={SPACING} p="md">
        <Title order={1} my={SPACING / 2}>
          Introduction
        </Title>
        <Divider my="sm" variant="dashed" />
        So far I put myself to to a goal, to understand how perceptrons work. I
        seem to learn the fastest, with getting my hands dirty and creating
        stuff. Banging my head in the wall until I come with a solution.
        <br />
        <br />
        Therefore, I decided to start from the most basic stuff I could think
        of. While I had a short coaching session with Coen, he showed me the
        basics of how perceptrons work and showed me a quick example of an AND
        gate perceptron. This gave me the idea and motivation to create my own
        implementation of a perceptron, and train it to behave like an AND gate.
        <Title order={1} my={SPACING / 2}>
          Language choice
        </Title>
        <Divider my="sm" variant="dashed" />I know that Python seems to be the
        most popular choice when it comes to AI, but I just can't grow to like
        and work with Python. Therefore, solely due to personal opinion, I
        decided to use JavaScript. Something that I am a lot more comfortable
        with, and can spend more time fighting the solution, rather the tool.
      </Paper>
      <Paper my={SPACING} p="md">
        <PerceptronCodeHighlight />
      </Paper>
      <Paper my={SPACING} p="md">
        <Title order={1} my={SPACING / 2}>
          Training the model
        </Title>
        <Divider my="sm" variant="dashed" />
        After the implementation of the Perceptron class, I continued with
        trying to train the model. The goal was simple - provide the perceptron
        enough amount of data about how an AND gate acts. After that, test if
        provided similar values it will start to behave like an end gate. So I
        wrote the following code, which should take an input of data, pass it to
        the train function of the perceptron X amounts of times.
        <TrainModel />
      </Paper>
      <Paper my={SPACING} p="md">
        <Title order={1} my={SPACING / 2}>
          Testing the model
        </Title>
        <Divider my="sm" variant="dashed" />
        Finally, the model should be tested against the data which I expect - an
        AND gate. The sample code bellow takes test data, with input and
        expected results and a trained perceptron as arguments. It runs all the
        data through the perceptron and returns an object containing the
        results.
        <TestData />
      </Paper>
      <Paper my={SPACING} p="md">
        <Title order={1} my={SPACING / 2}>
          Run it
        </Title>
        <Divider my="sm" variant="dashed" />

        <DataInput />
      </Paper>
    </Container>
  );
}

export default App;
