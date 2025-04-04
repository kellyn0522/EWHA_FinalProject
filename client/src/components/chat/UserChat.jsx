import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import account from "../../icons/account.svg";
import account_box from "../../icons/account_box.svg";
import person from "../../icons/person.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import "../../index.css"
import moment from "moment";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markThisUserNotificationAsRead } = useContext(ChatContext);
    const {latestMessage} = useFetchLatestMessage(chat);
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId == recipientUser?._id
    )
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);
    //const lastMessageTime = chat.lastMessageTime ? moment(chat.lastMessageTime).calendar() : "N/A";
    const truncateText = (text) => {
        let shortText = text.substring(0,20);
        if(text.length > 20){
            shortText = shortText +"...";
        }
        return shortText;
    };

    return (<>
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between"
            role="button"
                onClick ={() => {
                    if(thisUserNotifications?.length !==0){
                        markThisUserNotificationAsRead(
                             thisUserNotifications, notifications
                        );
                    }
                }}
            >
            <div className="d-flex align-items-center">
                <div className="me-3">
                    <img src={account} height="35px" />
                </div>
                <div className="text-content">
                    <div className="name">
                        {recipientUser?.nickName || 'Nickname'}
                    </div>
                    <div className="text">
                        {
                            latestMessage?.text && (
                                <span>{truncateText(latestMessage?.text)}</span>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">
                {moment(latestMessage?.createAt).calendar()}
                </div>
                <div className={
                    thisUserNotifications?.length > 0 ? "this-user-notifications": ""
                    }
                    >
                    {
                    thisUserNotifications?.length > 0
                    ? thisUserNotifications?.length
                    :""}
                </div>
                <span className={isOnline ? "user-online" : ""}> </span>
            </div>

        </Stack>
    </>);
};

export default UserChat;