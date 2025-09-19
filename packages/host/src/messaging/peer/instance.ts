import Peer, { DataConnection } from 'peerjs';
import { createPeer } from './peer';

const handleConnection = (conn: DataConnection): void => {
  console.log('connection', conn);

  conn.on('open', () => {
    console.log('connected', conn.connectionId);
  });

  conn.on('data', (data) => {
    console.log('data', data);
  });

  conn.on('error', (error) => {
    console.error('error', error);
  });

  conn.on('close', () => {
    console.log('closed', conn.connectionId);
  });
};

const attachMessaging = (hostId: string | null = null, peer: Peer = createPeer()): void => {
  const handleInit = (id: string): void => {
    console.log('open', id);

    peer.on('connection', handleConnection);

    // connect to host, if it's provided
    if (typeof hostId === 'string') {
      peer.connect(hostId);
    }
  };

  peer.on('open', handleInit);
};

export {
  attachMessaging,
};
