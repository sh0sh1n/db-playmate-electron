/* eslint-disable no-restricted-syntax */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecord, IVolume } from './interfaces';
import { RootState } from './store';
import { Participant } from './types';

export interface IPlayState {
  volume: IVolume;
}

const initialState: IPlayState = {
  volume: {} as IVolume,
};

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<IVolume>) => {
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
  (state: RootState) => state.play.volume,
  (volume) => {
    return getParticipantFromRecords(volume.records);
  }
);

export const getSessionParticipant = createSelector(
  [
    (state: RootState) => state.play.volume,
    (_, sessionId: number) => sessionId,
  ],
  (volume, sessionId) => {
    const participantList = getParticipantFromRecords(volume.records);

    const containerRecordList =
      volume.containers.find((container) => container.id === sessionId)
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
