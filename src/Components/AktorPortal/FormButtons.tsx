import { Button, ButtonGroup, Grid } from "semantic-ui-react";

function FormButtons({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <>
      <Grid>
        <Grid.Column textAlign="center">
          <ButtonGroup>
            <Button onClick={prevStep}>Forrige side</Button>
            <Button onClick={nextStep} positive>
              Neste Side
            </Button>
          </ButtonGroup>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default FormButtons;
