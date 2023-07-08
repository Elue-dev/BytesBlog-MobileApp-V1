import StepOne from "../../components/add_post/step_one/StepOne";
import StepTwo from "../../components/add_post/step_two/StepTwo";
import { usePosts } from "../../context/posts/PostContext";

export default function AddPostScreen() {
  const { pageStep, setPageStep } = usePosts();

  function nextStep() {
    setPageStep((currentStep) => currentStep + 1);
  }

  function previousStep() {
    if (pageStep === 1) return;
    setPageStep((currentStep) => currentStep - 1);
  }

  switch (pageStep) {
    case 1:
      return <StepOne nextStep={nextStep} previousStep={previousStep} />;
    case 2:
      return <StepTwo previousStep={previousStep} />;
    default:
      return null;
  }
}
