import * as React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";

// Personal Info Form
import PersonalInfoForm from "../personalInfoForm/PersonalInfoForm";

// Custom components
import FormHeaderLogo from "./header/FormHeaderLogo";
import Header from "./header/Header";

// core helper function
import { populateSymptoms, InitialIssues, populateConditions } from "utils/loadMedFormCheckBoxes";

import { initialConfirmConditionDescription } from "./descriptions";
import { handleCheckAction } from "types/medForm";

// reducers
import { symsCondsMapReducer, conditionsArrayReducer } from "stores/medFormReducers";

import { PersonalInfoContext } from "contexts/PersonalInfoState";
import SymptomsOfConditions from "./SymptomsOfConditions";
import RelatedConditions from "./RelatedConditions";
import CTAButtonsGroup from "./CTAButtonsGroup";

// frontend styling
import "css/medicalForm.css";
import "css/helperText.css";

import sunglightBgImg from "css/form-sunlight-bg.jpeg";

export type ISymptomsOfCondition = {
  symptoms: string[];
  conditionName: string;
};

export type IRelatedConditionsOfSymptoms = {
  conditionNames: string[];
  selectedCondition: string;
};

// store the issues somewhere
const initIssues: string[] = ["Heart attack", "Hernia", "Kidney stones", "Urinary tract infection"];

// Menstrual problems are the uncomfortable symptoms leading up to periods
const janeConfirmedIssues = [
  "Arthrosis",
  "Coronary heart disease",
  "Menstrual problems",
  "White skin cancer",
  "High blood pressure"
];

const juanitaConfirmedIssues = ["Acute inflammation of lung", "Back pain", "Cluster headache"];

const MedicalForm = (): JSX.Element => {
  const [symsCondsMap, symsCondsMapDispatch] = React.useReducer(symsCondsMapReducer, {});
  const [conditionsArray, condsArrDispatch] = React.useReducer(conditionsArrayReducer, []);

  const [symptomsOfCondition, setSymptomsOfCondition] = React.useState<ISymptomsOfCondition[]>();
  const [relatedConditions, setRelatedConditions] = React.useState<IRelatedConditionsOfSymptoms[]>();

  const { sex, dob } = React.useContext(PersonalInfoContext);

  const handleOnCheck: handleCheckAction = (symptom, isCondition, conditionName, type) => {
    if (type === "push") {
      if (isCondition) condsArrDispatch({ type: "pushCondition", condition: conditionName });
      else
        symsCondsMapDispatch({
          type: "pushSymptom",
          payload: { conditionName, symptom }
        });
    } else {
      if (isCondition) condsArrDispatch({ type: "removeCondition", condition: conditionName });
      else
        symsCondsMapDispatch({
          type: "removeSymptom",
          payload: { conditionName, symptom }
        });
    }
  };

  const handleOnGetSymptomsOfCondition = (conditionSymptomns: ISymptomsOfCondition[]) =>
    setSymptomsOfCondition(conditionSymptomns);

  const handleOnGetRelatedConditions = (relatedConds: IRelatedConditionsOfSymptoms[]) =>
    setRelatedConditions(relatedConds);

  const reset = () => {
    // FIXME: should have no need to define the payload in here, but think of a solution later
    symsCondsMapDispatch({ type: "reset", payload: { conditionName: "", symptom: "" } });
    condsArrDispatch({ type: "reset", condition: "" });
    setSymptomsOfCondition(undefined);
    setRelatedConditions(undefined);
  };

  const areAllFieldsEmpty =
    Object.keys(symsCondsMap).length === 0 &&
    conditionsArray.length === 0 &&
    !symptomsOfCondition &&
    !relatedConditions;

  const onSubmit = () => {
    if (!areAllFieldsEmpty) {
      alert("Thanks for completing the form, we will be in contact with you shortly");
      // hard refresh the page
      window.location.reload(false);
    }
  };

  return (
    <div>
      <img src={sunglightBgImg} className="sunglightBgImg" alt="sunglightBgImg" />
      {/* FIXME: The logo is too big and odd when embedded in the chatbot interface  */}
      <FormHeaderLogo />

      <Header text="Your Details" />
      <PersonalInfoForm />
      <Header text="Your Health Condition(s)" />

      {/* Conditions and Symptoms card below */}
      <Grid className="conditions-and-symptoms-container" container={true} alignItems="center" justify="center">
        <Grid item={true} xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <div>
                <p className="description">{initialConfirmConditionDescription}</p>
                <InitialIssues issues={juanitaConfirmedIssues} handleOnCheck={handleOnCheck} />

                <SymptomsOfConditions symptomsOfCondition={symptomsOfCondition} handleOnCheck={handleOnCheck} />

                <RelatedConditions relatedConditions={relatedConditions} handleOnCheck={handleOnCheck} />

                <CTAButtonsGroup
                  onSubmit={onSubmit}
                  populateSymptoms={() => {
                    populateSymptoms(conditionsArray, handleOnGetSymptomsOfCondition);
                  }}
                  populateRelatedConditions={() =>
                    populateConditions(symsCondsMap, conditionsArray, handleOnGetRelatedConditions, sex, dob.year)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MedicalForm;
