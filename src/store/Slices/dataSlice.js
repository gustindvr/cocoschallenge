import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
  photos: [],
  video: {},
  afipData: {},
};

export const dataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    postNewData: (state, action) => {
      state.userData = [...state.userData, action.payload];
    },

    setDataAfip: (state, action) => {
      state.afipData = [action.payload];
    },

    obtainDocsPhotos: (state, action) => {
      state.photos = [...state.photos, action.payload];
    },

    postVideoDoc: (state, action) => {
      (state.video = state.photos), action.payload;
    },
  },
});

export const { postNewData, obtainDocsPhotos, postVideoDoc, setDataAfip } =
  dataSlice.actions;

export default dataSlice.reducer;
