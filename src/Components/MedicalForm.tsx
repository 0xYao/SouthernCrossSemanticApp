import * as React from "react";
import CustomButton from "Components/Helpers/CustomButton";
import CustomCheckBox from "Components/Helpers/CustomCheckBox";
import { diagnoseConditionsFromSymptoms,getIssueId, getIssueInfo } from "SymptomCheckerApi/mainApi"

// include all these code in a separate file called MedicalForm.tsx
interface IForm {
  symptomsCheckBoxes: JSX.Element[],
  conditions: JSX.Element[],
  symptomsArray: string[],
}

interface IIssue {
  Issue: { Accuracy: number, ID: number, Name: string }
}

interface IResult extends IIssue {
  index: number
}

// run the localhost with chrome with this command to bypass cors
// google-chrome --disable-web-security --user-data-dir=~/.google-chrome-root or chrome
const MedicalForm = (): JSX.Element => {
  const [form, setForm] = React.useState<IForm>({
    symptomsCheckBoxes: [],
    symptomsArray: [],
    conditions: []
  })

  // old implementation of getting the conditions and the symptoms at the same time
  // const populateSymptomsAndCondtions = (condition: string): void => {
  //   const issueId: number = getIssueId(condition)
  //   const conditions: JSX.Element[] = []
  //   const symptomsCheckBoxes: JSX.Element[] = []

  //   getIssueInfo(issueId).then((res: { PossibleSymptoms: string }) => {
  //     const possibleSyms: string[] = res.PossibleSymptoms.split(",")
  //     const diagnoseResult: Promise<any> = diagnoseConditionsFromSymptoms(possibleSyms, "male", 1993)
  //     // populate the potential related issues and display more checkbox onto the page            
  //     diagnoseResult.then((result: IResult[]): void => {
  //       result.forEach((issue: IIssue, index: number): void => {
  //         const IssueName: string = issue.Issue.Name
  //         conditions.push(<CustomCheckBox text={IssueName} key={IssueName + `${index}`} />)
  //       })

  //       possibleSyms.forEach((symptom: string, index: number): void => {
  //         symptomsCheckBoxes.push(<CustomCheckBox text={symptom} key={symptom + `${index}`} />)
  //       });
  //       setForm({ symptomsCheckBoxes, conditions } as IForm)
  //     })
  //   })
  // }



  // *** D: seperate from old "populateSymptoms" function into two functions to make hard code parts easier ***
  
  // D: Don't know why but presssing "get symptoms" will return the same conditions depending
  // on what issue is selected, but this function returns the correct hard code conditions
  // need to keep working on this hard code
 
const populateSymptoms = (condition: string): void => {
    const issueId: number = getIssueId(condition)
    const symptomsCheckBoxes: JSX.Element[] = []
    getIssueInfo(issueId).then((res: { PossibleSymptoms: string }) => {
      
      const possibleSyms: string[] = res.PossibleSymptoms.split(",")
      console.log(possibleSyms)
      possibleSyms.forEach((symptom: string, index: number): void => {
        symptomsCheckBoxes.push(<CustomCheckBox text={symptom} key={symptom + `${index}`} />)
      })

      setForm({ symptomsCheckBoxes, symptomsArray: possibleSyms } as IForm)
    })
  }


// for heart attack conditions
  const populateConditions = (): void => {
    const conditions: JSX.Element[] = []    
    const diagnoseResult: Promise<any> = diagnoseConditionsFromSymptoms(form.symptomsArray, "male", 1993)
    // populate the potential related issues and display more checkbox onto the page            
    diagnoseResult.then((result: IResult[]): void => {
      result.forEach((issue: IIssue, index: number): void => {
        const IssueName: string = issue.Issue.Name
        conditions.push(<CustomCheckBox text={IssueName} key={IssueName + `${index}`} />)
      })
    setForm({ conditions } as IForm)
    })
  }
 




  return (
    <React.Fragment>
      <div>
      <CustomCheckBox text="Heart Attack" />
      <div>
      <CustomButton loadComponent={() => populateSymptoms("Heart Attack")} title="Get Symptoms"/>
      
      </div>
          <div>
              {form.symptomsCheckBoxes}
              <CustomButton loadComponent={populateConditions} title="Get Conditions" />
              {form.conditions}
          </div>
     </div>

     <br></br>

    
    
    </React.Fragment>
  );
};

export default MedicalForm;
