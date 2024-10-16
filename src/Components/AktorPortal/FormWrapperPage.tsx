import { Container, Divider } from "semantic-ui-react";
import FormButtons from "./FormButtons";
import FormInformation from "./FormInformation";
import FormQuestions from "./FormQuestions";
import { useState } from "react";

function FormWrapperPage() {
  const [currentStep, setCurrentStep] = useState(1);

  //max step.
  const nextStep = () => {
    setCurrentStep((prev) => {
      const newStep = prev < 4 ? prev + 1 : prev;
      console.log("Going to form stage " + newStep);
      return newStep;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); //not allowed to go under step 1
    console.log("Going to form stage ");
    console.log(currentStep);
  };

  //function that will send a param based on which step the user is in, in the form
  const renderFormQuestions = () => {
    switch (currentStep) {
      case 1:
        return <FormQuestions step={1} />;
      case 2:
        return <FormQuestions step={2} />;
      case 3:
        return <FormQuestions step={3} />;
      case 4:
        return <FormQuestions step={4} />;
      default:
    }
  };

  return (
    <>
      <Container className="container-form-style">
        {/* Wrap in form?  */}
        <FormInformation />
        {/* This is where the questions are. And is pretty much the only changing element on this form */}
        <Divider />
        {renderFormQuestions()}
        <Divider />
        {/*  */}
        {/* <ContactForm /> */}
        <FormButtons nextStep={nextStep} prevStep={prevStep} />
      </Container>
    </>
  );
}

export default FormWrapperPage;




