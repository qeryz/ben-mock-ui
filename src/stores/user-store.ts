import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
  loading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  searchUsers: (query: string) => void;
  clearSearch: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      filteredUsers: [],
      searchQuery: "",
      loading: false,
      error: null,

      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          if (!response.ok) throw new Error("Failed to fetch users");

          const users = await response.json();
          set({
            users,
            filteredUsers: users,
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      searchUsers: (query: string) => {
        const { users } = get();
        const filtered = query
          ? users.filter(
              (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            )
          : users;

        set({
          searchQuery: query,
          filteredUsers: filtered,
        });
      },

      clearSearch: () => {
        const { users } = get();
        set({
          searchQuery: "",
          filteredUsers: users,
        });
      },
    }),
    { name: "user-store" }
  )
);
