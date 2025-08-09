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

    React.useEffect(() => {
        if (window.innerWidth < 768) { // Mobile breakpoint
            document.body.style.overflow = 'hidden';
        }
        
        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

  return (
    <div className={`live-support fixed bg-white z-[2000] transition-all duration-300 ease-in-out
      w-full h-full top-0 left-0 rounded-none
      md:bottom-1 md:right-5 md:rounded-2xl md:mb-1 md:top-auto md:left-auto
      ${isExpanded ? 'md:w-[65%] md:h-[99vh]' : 'md:w-[30%] md:h-[90%]'}
    `}>
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
            <ChatAdmin onClose={onClose} />
        )}

    </div>
  )
}
