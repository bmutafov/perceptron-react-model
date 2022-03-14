import {
  Alert,
  Badge,
  Button,
  Divider,
  Group,
  NumberInput,
  SegmentedControl,
  Title,
  Text,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import React, { useState } from "react";
import { Perceptron } from "../../perceptron/Perceptron.class";
import { trainPerceptron } from "../../perceptron/train";
import DataInputRow, { DataInputRowHeader } from "./DataInputRow";

type DataType = [[number, number], number];
type TrainedResults = {
  expected: number;
  predicted: number;
  input: [number, number];
};

const PRESETS: { label: string; data: DataType[] }[] = [
  {
    label: "AND",
    data: [
      [[0, 0], -1],
      [[0, 1], -1],
      [[1, 0], -1],
      [[1, 1], 1],
    ],
  },
  {
    label: "OR",
    data: [
      [[0, 0], -1],
      [[0, 1], 1],
      [[1, 0], 1],
      [[1, 1], 1],
    ],
  },
  {
    label: "NAND",
    data: [
      [[0, 0], 1],
      [[0, 1], 1],
      [[1, 0], 1],
      [[1, 1], -1],
    ],
  },
  {
    label: "NOR",
    data: [
      [[0, 0], 1],
      [[0, 1], -1],
      [[1, 0], -1],
      [[1, 1], -1],
    ],
  },
];

const DataInput: React.FC = () => {
  const [epochs, handleEpochsChange] = useInputState(0);
  const [data, setData] = useState<DataType[]>(PRESETS[0].data);
  const [trainedPerceptron, setTrainedPerceptron] = useState<Perceptron | null>(
    null
  );
  const [trainedResults, setTrainedResults] = useState<TrainedResults[] | null>(
    null
  );
  const [isTraining, setIsTraining] = useState<boolean>(false);

  const run = () => {
    setIsTraining(true);
    setTimeout(() => {
      const perceptron = new Perceptron();
      trainPerceptron(data, epochs, perceptron);
      setTrainedPerceptron(perceptron);
      setIsTraining(false);
    }, 200);
  };

  const testTrainedPerceptron = () => {
    if (!trainedPerceptron) return;

    let results: TrainedResults[] = [];
    for (const [input, expected] of data) {
      const predicted = trainedPerceptron.guess(input);
      results.push({
        expected,
        input,
        predicted,
      });
    }

    setTrainedResults(results);
  };

  const clear = () => {
    setTrainedPerceptron(null);
    setTrainedResults(null);
    handleEpochsChange(0);
  };

  const handleDataChange = (i: number, incomingData: DataType): void => {
    const dataCopy = Array.from(data);
    dataCopy[i] = incomingData;
    setData(dataCopy);
  };

  const handlePresetChange = (value: string) => {
    const presetData = PRESETS.find((p) => p.label === value)!.data;
    setData(presetData);
  };

  return (
    <div>
      <Title order={4} my={5}>
        Choose preset:
      </Title>
      <SegmentedControl
        onChange={handlePresetChange}
        color="violet"
        fullWidth
        data={PRESETS.map((p) => ({ label: p.label, value: p.label }))}
      />
      <Title order={4} my={5}>
        Or enter manually:
      </Title>
      <DataInputRowHeader />
      {Array.from({ length: 4 }).map((_, i) => (
        <DataInputRow
          key={`${i}-${data[i]}`}
          values={data[i]}
          onChange={(incomingData) => handleDataChange(i, incomingData)}
        />
      ))}
      <Group position="right" align="center" mt={20}>
        <NumberInput
          placeholder="Epochs"
          onChange={handleEpochsChange}
          max={100_000}
        />
        <Button color="gray" onClick={clear}>
          Clear
        </Button>
        <Button
          color="green"
          onClick={run}
          disabled={epochs <= 0}
          loading={isTraining}
        >
          Train
        </Button>
      </Group>
      {epochs <= 0 && (
        <Group position="right">
          <Text color="red" weight="bold">
            Please enter number of learning cycles (epochs)
          </Text>
        </Group>
      )}
      {trainedPerceptron && (
        <>
          <Divider my={15} variant="dotted" />
          <Title order={2} my={5}>
            Results:
          </Title>
          <Group position="left" grow>
            <Group direction="column" spacing="xs">
              Weight 1
              <Badge size="lg" radius="sm">
                {trainedPerceptron.weights[0]}
              </Badge>
            </Group>
            <Group direction="column" spacing="xs">
              Weight 2
              <Badge size="lg" radius="sm">
                {trainedPerceptron.weights[1]}
              </Badge>
            </Group>
            <Group direction="column" spacing="xs">
              Bias
              <Badge size="lg" radius="sm" color="red">
                {trainedPerceptron.bias}
              </Badge>
            </Group>
            <Button
              color="blue"
              onClick={testTrainedPerceptron}
              disabled={!Boolean(trainedPerceptron)}
            >
              Test with table data
            </Button>
          </Group>
        </>
      )}
      {trainedResults && (
        <>
          <Divider my={15} variant="dotted" />
          <Alert>The info shown is using test data from the table above</Alert>
          {trainedResults.map((result) => (
            <Group position="left" my={10} grow>
              <Group spacing="xs">
                <b>Input:</b>
                <Badge size="lg" radius="sm" color="gray">
                  {result.input[0]} | {result.input[1]}
                </Badge>
              </Group>
              <Group spacing="xs">
                <b>Predicted:</b>
                <Badge size="lg" radius="sm" color="violet">
                  {result.predicted}
                </Badge>
              </Group>
              <Group spacing="xs">
                <b>Expected:</b>
                <Badge
                  size="lg"
                  radius="sm"
                  color={result.expected === result.predicted ? "green" : "red"}
                >
                  {result.expected}
                </Badge>
              </Group>
            </Group>
          ))}
        </>
      )}
    </div>
  );
};

export default DataInput;
