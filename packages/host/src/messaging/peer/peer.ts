import Peer from 'peerjs';

let instance: Peer | null = null;

const createPeer = (): Peer => {
  instance ??= new Peer();

  return instance;
};

export {
  createPeer,
};
