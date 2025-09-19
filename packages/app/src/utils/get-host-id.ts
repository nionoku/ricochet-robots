const getHostId = () => {
  const params = new URLSearchParams(globalThis.location.search);
  const hostId = params.get('host');

  return hostId;
};

export {
  getHostId,
};
