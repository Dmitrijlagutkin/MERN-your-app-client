import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../components/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
  }));

const PageNotFound = () => {
    const classes = useStyles();
    const history = useHistory()
    const onClickBack = () => history.push('/')

    return (
        <div className={classes.root}>
            <h2>Page not found</h2>
            <Button buttonText="back to home page" 
            onClickButton={onClickBack} 
            color="primary" 
            variant="contained"/>
        </div>
    )
}

export default PageNotFound