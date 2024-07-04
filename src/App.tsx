import {
  createTheme,
  Container,
  MantineProvider,
  Title,
  Flex,
  NumberInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const theme = createTheme({});

function App() {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      amount: 6,
      weight: 270,
      surdej: 20,
      salt: 2.5,
      hydration: 60,
      mel: 100,
    },
  });
  const { surdej, amount, hydration, salt, mel, weight } = form.values;

  const Totalvægt = amount * weight;

  return (
    <MantineProvider theme={theme}>
      <Container>
        <Title order={1}>Surdejspizza</Title>
        <Flex gap={30}>
          <NumberInput
            label="Antal Pizza"
            suffix=" stk"
            min={1}
            {...form.getInputProps("amount")}
          />
          <NumberInput
            label="Vægt"
            placeholder="Vægt pr. stk."
            step={10}
            suffix=" gr"
            {...form.getInputProps("weight")}
          />
          <NumberInput
            label="Hydration"
            placeholder=""
            step={1}
            suffix=" %"
            min={50}
            {...form.getInputProps("hydration")}
          />
          <NumberInput
            label="Surdej %"
            placeholder=""
            step={1}
            suffix=" %"
            min={10}
            {...form.getInputProps("surdej")}
          />
          <NumberInput
            label="Salt"
            placeholder=""
            step={0.1}
            suffix=" %"
            {...form.getInputProps("salt")}
          />
        </Flex>
        <Title order={2}>Ingredienser</Title>
        <Text>Totalvægt: {Totalvægt} gr</Text>
        <Text>
          Mel:{" "}
          {Math.round(Totalvægt * (mel / (mel + surdej + hydration + salt)))} gr
        </Text>
        <Text>
          Vand:{" "}
          {Math.round(
            Totalvægt * (hydration / (mel + surdej + hydration + salt))
          )}{" "}
          gr
        </Text>
        <Text>
          Aktiv Surdej:{" "}
          {Math.round(Totalvægt * (surdej / (mel + surdej + hydration + salt)))}{" "}
          gr
        </Text>
        <Text>
          Salt:{" "}
          {Math.round(Totalvægt * (salt / (mel + surdej + hydration + salt)))}{" "}
          gr
        </Text>
      </Container>
    </MantineProvider>
  );
}

export default App;
