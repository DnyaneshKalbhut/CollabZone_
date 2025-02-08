import React, { useState } from 'react';
import { LogLevel, HubConnectionBuilder } from '@microsoft/signalr';
import WaitingRoom from '../Components/WaitingRoom';
import ChatRoom from '../Components/ChatRoom';
import ChatBox from '../massageBox/ChatBox';
import { Circles } from 'react-loader-spinner';

const ChatHome = () => {
    const [connection, setConnection] = useState(null);
    const [usermessages, setusermessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const joinChatRoom = async (UserName, ChatRoom) => {
        setLoading(true);
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://chatapp20240710175935.azurewebsites.net/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setusermessages(prevMessages => [...prevMessages, { user, message, isSystem: true }]);
            });

            connection.on("ReceiveSpecificMessage", (user, message) => {
                setusermessages(prevMessages => [...prevMessages, { user, message }]);
            });

            connection.onclose(() => {
                console.log("Connection closed");
            });

            try {
                await connection.start();
             
            } catch (err) {
                console.error("Error while starting connection: ", err);
                setLoading(false);
                return;
            }

            await connection.invoke("JoinSpecificChatRoom", { UserName, ChatRoom });
            setConnection(connection);
        } catch (error) {
            console.error("Connection error: ", error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", message);
            } catch (error) {
                console.error("SendMessage error: ", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <main className="container flex-grow mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Circles
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                        <p className="ml-4 text-white">Connecting to chat room...</p>
                    </div>
                ) : (
                    !connection ? (
                        <WaitingRoom JoinChatRoom={joinChatRoom} />
                    ) : (
                        <div className="flex flex-col h-screen ">
                            <ChatRoom usermessages={usermessages} />
                            <ChatBox sendMessage={sendMessage} />  
                        </div>
                    )
                )}
            </main>
        </div>
    );
}

export default ChatHome;
