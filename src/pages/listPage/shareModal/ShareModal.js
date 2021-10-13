import Modal from "../../../components/Modal"
import {TelegramShareButton, 
    WhatsappShareButton, 
    EmailShareButton,
    TelegramIcon, 
    WhatsappIcon,
    EmailIcon
} from "react-share";
import { makeStyles } from '@material-ui/styles';
import { CLIENT_URL, TELEGRAM, WHATSAPP, EMAIL } from "../../../constants";
import {useMessageContent} from "../../../hooks/useMessageContent"

const useStyles = makeStyles((theme) => ({
    shareIcons: {
        margin: "10px"
    }
}));

const ShareModal = ({open, onClickClose, listData}) => {
    const classes = useStyles()

    const {shareUrlTelegram, titleTelegram} = useMessageContent(TELEGRAM, listData)
    const {shareUrlWhatsApp, titleWhatsApp} = useMessageContent(WHATSAPP, listData)
    const {bodyEmail, textEmail, subjectEmail} = useMessageContent(EMAIL, listData, CLIENT_URL)

    return (
        <Modal withHeader={true}
            onClickClose={onClickClose}
            open={open}
            title="send your list"
        >
            <div>
                <TelegramShareButton className={classes.shareIcons}
                    url={shareUrlTelegram}
                    title={titleTelegram}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <WhatsappShareButton className={classes.shareIcons}
                    title={shareUrlWhatsApp}
                    url={titleWhatsApp}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <EmailShareButton className={classes.shareIcons} 
                    url={textEmail}
                    subject={subjectEmail}
                    body={bodyEmail}>    
                    <EmailIcon size={32} round/>
                </EmailShareButton>
            </div>
        </Modal>
    )
}

export default ShareModal