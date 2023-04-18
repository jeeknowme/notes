
const Notification = ({message, type}) => {
    if(message !== null){
        return <div className={type}>
            {message}
        </div>
    }
}

export default Notification
