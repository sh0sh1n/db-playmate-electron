/* eslint-disable no-restricted-syntax */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecord, IVolumeInfo } from '../interfaces';
import { Participant } from './types';

export interface IPlayState {
  volume: IVolumeInfo;
}

const initialState: IPlayState = {
  volume: {} as IVolumeInfo,
};

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<IVolumeInfo>) => {
      state.volume = action.payload;
    },
  },
});

const getParticipantFromRecords = (recordList: IRecord[]): Participant[] => {
  return recordList
    .filter((record) => record.category === 1)
    .map((obj) => {
      return {
        recordId: obj.id,
        id: obj.measures[1],
        gender: obj.measures[5],
      } as Participant;
    });
};

const getParticipantByRecord = (
  particpantList: Participant[],
  recordId: number
): Participant[] => {
  return particpantList.filter(
    (participant) => participant.recordId === recordId
  );
};

export const getParticipants = createSelector(
  (state: any) => state.play.volume,
  (volume) => {
    return getParticipantFromRecords(volume.records);
  }
);

export const getSessionParticipant = createSelector(
  [(state: any) => state.play.volume, (_, sessionId: number) => sessionId],
  (volume, sessionId) => {
    const participantList = getParticipantFromRecords(volume.records);

    const containerRecordList =
      volume.containers.find((container: any) => container.id === sessionId)
        ?.records || [];

    const result: Participant[] = [];

    for (const containerRecord of containerRecordList) {
      const participant = getParticipantByRecord(
        participantList,
        containerRecord.id
      );

      if (participant && participant.length > 0) {
        result.push(...participant);
      }
    }

    return result;
  }
);

export const { setVolume } = playSlice.actions;
export default playSlice.reducer;
