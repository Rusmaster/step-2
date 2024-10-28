import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants"; // URL для API
import checkResponse from "../../utils/checkResponse"; // обработка ответа
import { RootState } from "../store";
import axios from "axios";

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
  userData: string | null;
  updateSuccess: boolean;
  passwordChangeSuccess: boolean;
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
  userData: null,
  updateSuccess: false,
  passwordChangeSuccess: false,
};

//
interface UpdateUserInfoPayload {
  name: string;
  email: string;
  password?: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Сохраняем токены в localStorage без изменений
        localStorage.setItem("accessToken", data.accessToken); // Сохраняем "Bearer ..." целиком
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
      } else {
        return rejectWithValue(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      return rejectWithValue("Ошибка авторизации");
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
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
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
  }
);

// Обновление токена (если необходимо)
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return rejectWithValue("RefreshToken отсутствует");
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }), // отправляем refreshToken как есть
      });

      const data = await response.json();

      if (response.ok) {
        // Логируем токены для проверки
        console.log("Новый accessToken:", data.accessToken);
        console.log("Новый refreshToken:", data.refreshToken);

        // Проверка правильности JWT токена
        try {
          const accessTokenParts = data.accessToken.split(".");
          if (accessTokenParts.length !== 3) {
            throw new Error("Неверный формат JWT");
          }
          const header = JSON.parse(atob(accessTokenParts[0]));
          const payload = JSON.parse(atob(accessTokenParts[1]));
          console.log("JWT Header:", header);
          console.log("JWT Payload:", payload);
        } catch (error) {
          if (error instanceof Error) {
            console.error("Ошибка с токеном:", error.message);
            return rejectWithValue("Неверный токен");
          } else {
            return rejectWithValue("Неизвестная ошибка с токеном");
          }
        }

        // Сохраняем новый токен в localStorage
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);

        return data; // Возвращаем новые токены
      } else {
        return rejectWithValue(data.message || "Ошибка обновления токена");
      }
    } catch (error) {
      // Проверяем, является ли ошибка экземпляром Error
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка обновления токена");
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.user.accessToken;

    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Токен передается в заголовке
        },
      });

      if (!response.ok) {
        return rejectWithValue("Не удалось получить данные пользователя");
      }

      const data = await response.json();
      return data.user; // Возвращаем данные о пользователе
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла ошибка при получении данных");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updatedData: UpdateUserInfoPayload, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.user.accessToken;

    const response = await axios.patch(`${BASE_URL}/auth/user`, updatedData, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload as string;
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
        state.isAuthenticated = true;
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
        state.isAuthenticated = false;
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
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Восстановление пароля
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Обновление данных пользователя
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateSuccess = true;

        // Обновляем только те данные, которые действительно пришли с сервера
        if (action.payload) {
          state.user = action.payload.user || state.user; // обновляем информацию о пользователе
          state.email = action.payload.email || state.email; // обновляем email, если есть
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload as string | null; // Приведение типа к string | null
      });
  },
});
export default userSlice.reducer;

// function setCookie(name: string, value: string, options: { expires: number }) {
//   const date = new Date();
//   date.setTime(date.getTime() + options.expires * 1000); // преобразование в миллисекунды

//   let expires = "expires=" + date.toUTCString();
//   document.cookie = `${name}=${value};${expires};path=/`;
// }
