import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'sonner';

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('http', 'ws').replace('/api', '/ws-booking') : 'http://localhost:8080/ws-booking');

export default function useSlotAvailability(adminId) {
    const [lockedSlots, setLockedSlots] = useState([]);
    const clientRef = useRef(null);

    useEffect(() => {
        if (!adminId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(WEBSOCKET_URL),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/availability/${adminId}`, (message) => {
                    const content = message.body;
                    if (content.startsWith('LOCKED:')) {
                        const [, date, start, end] = content.split(':');
                        setLockedSlots(prev => [...prev, { date, start, end }]);
                    } else if (content.startsWith('UNLOCKED:')) {
                        const [, date] = content.split(':');
                        setLockedSlots(prev => prev.filter(slot => slot.date !== date));
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, [adminId]);

    const isSlotLocked = (date, start, end) => {
        return lockedSlots.some(slot => 
            slot.date === date && 
            ((slot.start < end && slot.end > start)) // basic overlap check
        );
    };

    return { isSlotLocked };
}
