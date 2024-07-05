import {
  createTheme,
  Container,
  MantineProvider,
  Title,
  Flex,
  NumberInput,
  Text,
  Space,
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
      <Container size="sm">
        <Title order={1}>Surdejspizza</Title>
        <Flex gap="md" wrap="wrap">
          <NumberInput
            style={{ width: "100%", maxWidth: "370px" }}
            label="Antal Pizza"
            suffix=" stk"
            min={1}
            {...form.getInputProps("amount")}
          />
          <NumberInput
            style={{ width: "100%", maxWidth: "370px" }}
            label="Vægt"
            placeholder="Vægt pr. stk."
            step={10}
            suffix=" gr"
            {...form.getInputProps("weight")}
          />
          <NumberInput
            style={{ width: "100%", maxWidth: "370px" }}
            label="Hydration"
            placeholder=""
            step={1}
            suffix=" %"
            min={50}
            {...form.getInputProps("hydration")}
          />
          <NumberInput
            style={{ width: "100%", maxWidth: "370px" }}
            label="Surdej %"
            placeholder=""
            step={1}
            suffix=" %"
            min={10}
            {...form.getInputProps("surdej")}
          />
          <NumberInput
            style={{ width: "100%", maxWidth: "370px" }}
            label="Salt"
            placeholder=""
            step={0.1}
            suffix=" %"
            {...form.getInputProps("salt")}
          />
        </Flex>
      </Container>

      <Space h="xl" />

      <Container size="sm">
        <Title order={2}>Ingredienser</Title>
        <Flex justify={"space-between"}>
          <Text>Totalvægt: </Text>
          <Text>{Totalvægt} gr</Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Mel: </Text>
          <Text>
            {Math.round(Totalvægt * (mel / (mel + surdej + hydration + salt)))}{" "}
            gr
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Vand: </Text>
          <Text>
            {Math.round(
              Totalvægt * (hydration / (mel + surdej + hydration + salt))
            )}{" "}
            gr
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Aktiv Surdej: </Text>
          <Text>
            {Math.round(
              Totalvægt * (surdej / (mel + surdej + hydration + salt))
            )}{" "}
            gr
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Salt: </Text>
          <Text>
            {Math.round(Totalvægt * (salt / (mel + surdej + hydration + salt)))}{" "}
            gr
          </Text>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default App;
