import {
    TelegramShareButton
  } from "react-share";
  import {
    TelegramIcon,
  } from "react-share";

const ShareWithFriends = () => {
    const shareUrl= "Your list"
    const title = `
    1. first item,
    2. second item`

 return <div>
     share
     <TelegramShareButton
            url={shareUrl}
            title={title}
            // className="Demo__some-network__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
     </div>
}

export default ShareWithFriends