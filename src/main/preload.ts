import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getVolumeInfo } from 'services/databrary-service';

export type Channels = 'ipc-example';
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  databrary: {
    async getVolumeInfo(channel: Channels, volumeId: string) {
      return getVolumeInfo(volumeId);
    },
  },
});

contextBridge.exposeInMainWorld('svc-box', {
  ls: (folderId: string) => ipcRenderer.invoke('box-ls', folderId),
});
