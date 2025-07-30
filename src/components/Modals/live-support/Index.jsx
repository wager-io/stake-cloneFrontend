import React from 'react'
import Tabs from './Tabs'
import Home from './Home'
import Messages from './Message'
import ChatAdmin from './ChatAdmin';
import Help from './Help';

export default function LiveSupport({ onClose }) {
    const [tab, setTab] = React.useState("home");
    const [showChatAdmin, setShowChatAdmin] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={`live-support ${isExpanded ? 'w-[65%] h-[99vh]' : 'w-[30%] h-[97vh]'} fixed bottom-0 bg-white right-5 z-[2000] rounded-2xl mb-1 transition-all duration-300 ease-in-out`}>
        {!showChatAdmin && (
            <>
                {tab === "home" && (
                    <Home onClose={onClose} />
                )}
                {tab === "message" && (
                    <Messages setShowChatAdmin={setShowChatAdmin} onClose={onClose} />
                )}

               {tab === "help" && (
                    <Help onClose={onClose} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                )}

                {!isExpanded && <Tabs tab={tab} setTab={setTab}/>}
            </>
        )}



        {showChatAdmin && (
            <ChatAdmin setShowChatAdmin={setShowChatAdmin} />
        )}

    </div>
  )
}
