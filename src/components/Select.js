import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: "-20px",
    minWidth: 218,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectOptionAdd: {
      color: "#3f51b5"
  },
}));

const SimpleSelect = ({categoryList, onChange, selectedCategory, onClickAddCategory}) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          onChange={onChange}
        > 
        {categoryList?.map((category) => { 
            if(!!category) return <MenuItem key={category} value={category}>{category}</MenuItem>
        })}
          <MenuItem className={classes.selectOptionAdd} value={10} onClick={onClickAddCategory}>
                add category
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SimpleSelect