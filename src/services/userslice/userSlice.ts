import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants"; // URL для API
import  checkResponse  from "../../utils/checkResponse"; // обработка ответа

interface UserState {
  user: {
    email: string;
    name: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  hasError: boolean;
  loading: boolean;
  error: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  hasError: false,
  loading: false,
  error: null,
  isAuthenticated: false,
};



export const registerUser = createAsyncThunk(
    'user/register',
    async({email, password, name}: {email: string; password: string; name: string}, {rejectWithValue}) => {
        try {
       
const res = await fetch (`${BASE_URL}/auth/register`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
 body: JSON.stringify({ email, password, name }),
});
 const data = await checkResponse(res);
      return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await checkResponse(res);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      const data = await checkResponse(res);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// Экшен для отправки запроса на восстановление пароля
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке email на восстановление пароля");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Экшен для восстановления пароля
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          token,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при восстановлении пароля");
      }

      return await response.json();
    } catch (error) {
  if (error instanceof Error) {
    return rejectWithValue(error.message);
  } else {
    return rejectWithValue("Неизвестная ошибка");
  }
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Авторизация пользователя
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // Выход из системы
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })


      //Сброс пароля через email 
      .addCase(forgotPassword.pending, (state) => {
state.loading = true;
state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state)=> {
state.loading = false;
state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action)=>{
state.loading = false;
state.error = action.payload as string;
      })


      // Восстановление пароля

      .addCase (resetPassword.pending, (state)=>{
state.loading = true;
state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state)=>{
state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action)=>{
  state.loading = false;
  state.error = action.payload as string;
      })
  },
});
export default userSlice.reducer;
