import {createContext, useState, useContext, useEffect, } from 'react'
import {postEventRequest} from '../api/events.js'

export const EventContext = createContext();

export const useEvent = () => {
    const context = useContext(EventContext);
    if(!context) {
        throw new Error("useEvent must be used within an authProvider")
    }
    return context;
}

export const EventProvider = ({children}) => {
    
    const [event, setEvent] = useState(null);

    const postEvent = async (event) => {
        try{
            const res = await postEventRequest(event);
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EventContext.Provider value={{
            postEvent,
            event
        }}>
            {children}
        </EventContext.Provider>
    )
}