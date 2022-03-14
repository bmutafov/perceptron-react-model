import { Grid, Group, NumberInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import React, { useEffect } from "react";

interface DataInputRowProps {
  values: [[number, number], number];
  onChange: (values: [[number, number], number]) => void;
}

const DataInputRow: React.FC<DataInputRowProps> = ({ values, onChange }) => {
  const [input1, setInput1] = useInputState(values[0][0]);
  const [input2, setInput2] = useInputState(values[0][1]);
  const [target, setTarget] = useInputState(values[1]);

  useEffect(() => {
    onChange([[input1, input2], target]);
  }, [input1, input2, target]);

  return (
    <Grid align="center" justify="center">
      <Grid.Col span={4}>
        <NumberInput value={input1} onChange={setInput1} size="xs" />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput value={input2} onChange={setInput2} size="xs" />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput value={target} onChange={setTarget} size="xs" />
      </Grid.Col>
    </Grid>
  );
};

export const DataInputRowHeader: React.FC = () => {
  return (
    <Grid align="center" justify="center">
      <Grid.Col span={4}>Input 1</Grid.Col>
      <Grid.Col span={4}>Input 2</Grid.Col>
      <Grid.Col span={4}>Outcome</Grid.Col>
    </Grid>
  );
};

export default DataInputRow;
