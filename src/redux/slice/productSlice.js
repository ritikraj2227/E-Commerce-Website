import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

// Define the AsyncThunk
export const fetchFirestoreData = createAsyncThunk("firestore/fetchData", async (_, { rejectWithValue }) => {
	try {
		const data = [];
		const querySnapshot = await getDocs(collection(db, "products"));
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() });
		});
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

// Define the slice
const productSlice = createSlice({
	name: "product",
	initialState: {
		product: [],
		filteredProducts: [],
		categories: [],
		status: "idle",
		error: null,
		filter: null,
		search: null,
	},
	reducers: {
		filterByCategory: (state, action) => {
			state.filter = action.payload;
			if (action.payload === 'ALL') {
				state.filteredProducts = state.product;
			} else {
				state.filteredProducts = state.product.filter((product) => product.category === action.payload);
			}
		},
		searchByName: (state, action) => {
			state.search = action.payload;
			if (!action.payload) {
				state.filteredProducts = state.product;
			} else {
				state.filteredProducts = state.product.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()));
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFirestoreData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchFirestoreData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.product = action.payload;
				state.filteredProducts = action.payload;
				state.categories = ['ALL', ...new Set(action.payload.map((product) => product.category))];
			})
			.addCase(fetchFirestoreData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default productSlice.reducer;
export const { filterByCategory, searchByName } = productSlice.actions;
