import {useState} from "react"
import {useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Input from "../../components/Input"
import Tooltip from "../../components/Tooltip"
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    inputTitleWrapper: {
        maxWidth: "95%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const CreateListItem = ({onClickConfirmItem}) => {
    const classes = useStyles()
    const [itemName, setItemName] = useState('')
    const onChangeItemName = (e) => setItemName(e.target.value)

    return (
        <div className={classes.inputTitleWrapper}>
            <Input label="Item name"
                onChangeInput = {(e) => onChangeItemName(e)}
                defaultValue={!!itemName ? itemName : null}
                />
                <Tooltip title={"Enter item name"}
                    placement="bottom"
                    arrow={true}>
                    <CheckIcon color={!!itemName ? "primary" : "disabled"} 
                        style={!!itemName ? {cursor: "pointer"} : {cursor: "not-allowed"}}
                        onClick={() => onClickConfirmItem(itemName)}
                        />
                </Tooltip>
        </div>
    )
}

export default CreateListItem