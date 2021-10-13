import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  rootLight: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },

    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiInputBase-root": {
      color: "#fff",
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },

  },
}));

const BasicTextFields = ({label, 
    onChangeInput,
    onBlurInput,
    onFocusInput, 
    type,
    required,
    errorInput,
    defaultValue,
    isLiteInput
}) => {
  const classes = useStyles();

  return (
    <form className={isLiteInput ? classes.rootLight : classes.root} noValidate autoComplete="off">
      <TextField size="small"
        variant="outlined" 
        type={type}
        required={required} 
        label={label} 
        onChange={onChangeInput}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        error={errorInput}
        defaultValue={defaultValue}
        />
    </form>
  );
}

export default BasicTextFields