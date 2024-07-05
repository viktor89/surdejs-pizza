import {
  createTheme,
  Container,
  MantineProvider,
  Title,
  Flex,
  NumberInput,
  Text,
  Space,
  Grid,
  Timeline,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";

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
      <Container size="sm" style={{ position: "relative", minHeight: "100vh" }}>
        <Title order={1}>Surdejspizza</Title>
        <Grid>
          <Grid.Col span={6}>
            <NumberInput
              label="Antal Pizza"
              suffix=" stk"
              min={1}
              {...form.getInputProps("amount")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Vægt"
              placeholder="Vægt pr. stk."
              step={10}
              suffix=" gr"
              {...form.getInputProps("weight")}
            />{" "}
          </Grid.Col>

          <Grid.Col span={6}>
            <NumberInput
              label="Hydration"
              placeholder=""
              step={1}
              suffix=" %"
              min={50}
              {...form.getInputProps("hydration")}
            />{" "}
          </Grid.Col>

          <Grid.Col span={6}>
            <NumberInput
              label="Surdej %"
              placeholder=""
              step={1}
              suffix=" %"
              min={10}
              {...form.getInputProps("surdej")}
            />{" "}
          </Grid.Col>

          <Grid.Col span={6}>
            <NumberInput
              label="Salt"
              placeholder=""
              step={0.1}
              suffix=" %"
              {...form.getInputProps("salt")}
            />{" "}
          </Grid.Col>
        </Grid>

        <Space h="xl" />

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

        <Space h="xl" />

        <Title order={2}>Instrukser</Title>
        <Space h="md" />
        <Timeline>
          <Timeline.Item title="New branch">
            <Text c="dimmed" size="sm">
              You&apos;ve created new branch{" "}
              <Text variant="link" component="span" inherit>
                fix-notifications
              </Text>{" "}
              from master
            </Text>
            <Text size="xs" mt={4}>
              2 hours ago
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Commits">
            <Text c="dimmed" size="sm">
              You&apos;ve pushed 23 commits to
              <Text variant="link" component="span" inherit>
                fix-notifications branch
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              52 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
        <ActionIcon
          style={{ position: "absolute", right: 20, bottom: 20 }}
          variant="gradient"
          size="xl"
          aria-label="Save presets"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          <IconDeviceFloppy />
        </ActionIcon>
      </Container>
    </MantineProvider>
  );
}

export default App;
