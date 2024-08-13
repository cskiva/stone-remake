import * as React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { StepperBox } from "./styles/StoreStyles";
import Typography from "@material-ui/core/Typography";

export default function CheckoutStepper(props: { steps: string[], activeStep: number }) {
	const [activeStep, setActiveStep] = React.useState(props.activeStep);
	const [skipped] = React.useState(new Set<number>());

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	React.useEffect(() => {
		setActiveStep(props.activeStep);
	}, [props.activeStep]);

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<StepperBox sx={{ width: "60%", margin: "2em  auto" }}>
			<Stepper activeStep={activeStep} color="primary">
				{props.steps.map((label, index) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: React.ReactNode;
					} = {};
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === props.steps.length ? (
				<React.Fragment>
					<Typography>
						All steps completed - you&apos;re finished
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</React.Fragment>
			) : null}
		</StepperBox>
	);
}