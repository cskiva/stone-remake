import {
	HomeFormLabel,
	HomeInput,
	HomeSubmitButton,
} from "../../components/pageComponents/styles/HomeStyles";

import React from "react";

const InputField = (props: {
  label: string;
  type: string;
  isRequired: boolean;
  disabledOverride: boolean;
  name: string;
  placeholder: string;
  value: string;
  onChangeHandler: ((value: string) => void) | null;
  formValues: [email: string, name: string] | null;
}) => {
	const validateInput = (values: [email: string, name: string] | null) => {
		if (
			values != null &&
      (values.some((f) => f === "") || values[0].indexOf("@") === -1)
		) {
			return true;
		}
		else {
			return false;
		}
	};

	if (props.type === "submit") {
		return (
			<HomeSubmitButton
				value={props.label}
				type={props.type}
				disabled={props.disabledOverride || validateInput(props.formValues)}
			/>
		);
	}
	else if (props.type === "textarea") {
		return null;
	}
	else {
		return (
			<>
				<HomeFormLabel>{props.label} </HomeFormLabel>
				<HomeInput
					onChange={(e) =>
						props.onChangeHandler && props.onChangeHandler(e.target.value)
					}
					type={props.type}
					placeholder={props.placeholder}
					value={props.value}
					required={props.isRequired}
					className="inputField__field"
					name={props.name}
				/>
			</>
		);
	}
};

export default React.memo(InputField);
