import * as React from "react";
import { Card, CardContent, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SexCheckBox from "./SexCheckBox";
import { PersonalInfoContext } from "contexts/PersonalInfoState";
import "css/personalInfoForm.css";

const PersonalInfoForm = (): JSX.Element => {
  const { dob, setSex, setDob } = React.useContext(PersonalInfoContext);

  const handleOnDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob({ ...dob, day: event.target.value });
  };

  const handleOnMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob({ ...dob, month: event.target.value });
  };

  // need sex and year for diagnoseConditionsFromSymptoms function
  const handleOnYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob({ ...dob, year: event.target.value });
  };

  const handleOnSexChecked = (gender: string): void => {
    setSex(gender);
  };

  const { day, month, year } = dob;

  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiTextField-root": {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.between("sm", "xl")]: {
          width: "30%"
        },
        [theme.breakpoints.down("sm")]: {
          width: "100%"
        }
      }
    }
  }));

  const classes = useStyles();

  return (
    <Grid className="info-form-container" container={true} alignItems="center" justify="center">
      <Grid item={true} xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
            <form className={classes.root}>
              <p className="header">Personal Information</p>
              <TextField label="First name" />
              <TextField label="Surname" />
              <p className="header">Date of Birth</p>
              <TextField
                id="day-outlined-basic"
                label="day"
                variant="outlined"
                onChange={handleOnDayChange}
                value={day}
              />
              <TextField
                id="month-outlined-basic"
                label="month"
                variant="outlined"
                onChange={handleOnMonthChange}
                value={month}
              />
              <TextField
                id="year-outlined-basic"
                label="year"
                variant="outlined"
                onChange={handleOnYearChange}
                value={year}
              />
            </form>
            <p className="header">Biological sex</p>
            <SexCheckBox onCheck={handleOnSexChecked} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalInfoForm;
