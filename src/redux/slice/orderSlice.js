import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

// Define the AsyncThunk
export const fetchFirestoreDataOrder = createAsyncThunk("firestore/fetchData", async (_, { rejectWithValue }) => {
	try {
		const data = [];
		const querySnapshot = await getDocs(collection(db, "orders"));
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() });
		});
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const orderSlice = createSlice({
	name: "orders",
	initialState: {
		orders: [],
		totalOrderAmount: null,
		status: "idle",
		error: null,
	},
	reducers: {
		CALC_TOTAL_ORDER_AMOUNT(state, action) {
			const array = [];
			state.orders.map((item) => {
				const { orderAmount } = item;
				return array.push(orderAmount);
			});
			const totalAmount = array.reduce((a, b) => {
				return a + b;
			}, 0);
			state.totalOrderAmount = totalAmount;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFirestoreDataOrder.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchFirestoreDataOrder.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.orders = action.payload;
			})
			.addCase(fetchFirestoreDataOrder.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default orderSlice.reducer;
