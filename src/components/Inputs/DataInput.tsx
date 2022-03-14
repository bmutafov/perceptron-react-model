import {
  Badge,
  Button,
  Divider,
  Group,
  NumberInput,
  SegmentedControl,
  Title,
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
];

const DataInput: React.FC = () => {
  const [epochs, handleEpochsChange] = useInputState(0);
  const [data, setData] = useState<DataType[]>(PRESETS[0].data);
  const [trainedPerceptron, setTrainedPerceptron] = useState<Perceptron>();
  const [trainedResults, setTrainedResults] = useState<TrainedResults[]>();
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
        <Button
          color="green"
          onClick={run}
          disabled={epochs <= 0}
          loading={isTraining}
        >
          Train
        </Button>
      </Group>
      {trainedPerceptron && (
        <>
          <Divider my={15} />
          <Group position="left" grow>
            <Group direction="column" spacing="xs">
              <b>Weight I1:</b>
              <Badge size="lg" radius="sm">
                {trainedPerceptron.weights[0]}
              </Badge>
            </Group>
            <Group direction="column" spacing="xs">
              <b>Weight I2:</b>
              <Badge size="lg" radius="sm">
                {trainedPerceptron.weights[1]}
              </Badge>
            </Group>
            <Group direction="column" spacing="xs">
              <b>Bias:</b>
              <Badge size="lg" radius="sm" color="red">
                {trainedPerceptron.bias}
              </Badge>
            </Group>
            <Button
              color="blue"
              onClick={testTrainedPerceptron}
              disabled={!Boolean(trainedPerceptron)}
            >
              Test trained perceptron
            </Button>
          </Group>
        </>
      )}
      {trainedResults && (
        <>
          <Divider my={15} />
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
                <Badge size="lg" radius="sm" color="red">
                  {result.predicted}
                </Badge>
              </Group>
              <Group spacing="xs">
                <b>Expected:</b>
                <Badge size="lg" radius="sm" color="green">
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
