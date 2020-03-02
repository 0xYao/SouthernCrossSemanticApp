import * as React from "react";
import CustomButton from "./helpers/CustomButton";
import "css//ctaBtnsGroup.css";

type CTAButtonsGroupProps = {
  populateSymptoms: () => void;
  populateRelatedConditions: () => void;
};

const CTAButtonsGroup = (props: CTAButtonsGroupProps) => {
  const { populateSymptoms, populateRelatedConditions } = props;

  return (
    <div className="btns-group-container">
      <CustomButton loadComponent={populateSymptoms} title="Get Symptoms" />
      <CustomButton loadComponent={populateRelatedConditions} title="Get Related Conditions" />
    </div>
  );
};

export default CTAButtonsGroup;
