import {useState, useCallback} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    checkBox: {
        padding: "0" 
    },
    iconActiveColor: {
        color: "#f44336",
        marginTop: "-5px"
    },
    iconUnActiveColor: {
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "-5px"
    }
}));

export default function CheckBox({onClickCheckBox, withIcon, defoultCheckbox, isComplete}) {
    const classes = useStyles()
    const [checked, setChecked] = useState(isComplete);

    const handleChange = () => {
        setChecked(isComplete);
    };

    const checkBox = useCallback(() => {
        switch (true) {
            case defoultCheckbox: {
                return <Checkbox
                    checked={isComplete}
                    onChange={handleChange}
                    defaultChecked
                    color="primary"
                    // inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            }
            case withIcon: {
                return  <Checkbox 
                    className={classes.checkBox}
                    onClick={onClickCheckBox}
                    icon={<Favorite className={classes.iconUnActiveColor} />} 
                    checkedIcon={<Favorite className={classes.iconActiveColor} />} 
                />
            }
        }

    }, [defoultCheckbox, withIcon, checked, onClickCheckBox, handleChange])
  
  return <>
        {checkBox()}
    </>
}