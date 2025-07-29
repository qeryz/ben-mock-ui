import * as React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useState, useRef, useCallback } from "react";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  showSearchIcon?: boolean;
  onUserSelect?: (user: any) => void;
  debounceMs?: number;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      type = "search",
      showSearchIcon = true,
      onUserSelect,
      debounceMs = 300,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const {
      filteredUsers,
      searchQuery,
      loading,
      error,
      fetchUsers,
      searchUsers,
      clearSearch,
    } = useUserStore();

    // Fetch users on mount
    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

    // Debounced search function
    const debouncedSearch = useCallback(
      (value: string) => {
        // Clear previous timeout
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        setIsOpen(false);

        // Set new timeout
        debounceRef.current = setTimeout(async () => {
          setIsOpen(true);
          setIsSearching(true);
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
          searchUsers(value);
          setIsSearching(false);
        }, debounceMs);
      },
      [searchUsers, debounceMs]
    );

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setIsOpen(value.length > 0);

      if (value.length > 0) {
        debouncedSearch(value);
      } else {
        // Clear search immediately if input is empty
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        setIsSearching(false);
        clearSearch();
      }
    };

    // Handle user selection
    const handleUserSelect = (user: any) => {
      setInputValue(user.name);
      setIsOpen(false);
      onUserSelect?.(user);
      clearSearch();

      // Clear any pending debounced search
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };

    // Handle clear
    const handleClear = () => {
      setInputValue("");
      setIsOpen(false);
      setIsSearching(false);
      clearSearch();

      // Clear any pending debounced search
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Cleanup debounce on unmount
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          {showSearchIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MagnifyingGlassIcon className="w-4 h-4" />
            </div>
          )}

          <input
            ref={ref || inputRef}
            type={type}
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              "flex h-9 w-full rounded-2xl bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
              showSearchIcon && "pl-9",
              inputValue && "pr-8",
              "[&::-webkit-search-cancel-button]:appearance-none",
              className
            )}
            {...props}
          />

          {inputValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {(loading || isSearching) && (
              <div className="p-3 text-center text-gray-500 flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                <div className="text-xs">Searching...</div>
              </div>
            )}

            {error && (
              <div className="p-3 text-center text-red-500">Error: {error}</div>
            )}

            {!loading &&
              !isSearching &&
              !error &&
              filteredUsers.length === 0 &&
              inputValue && (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No users found for "{inputValue}"
                </div>
              )}

            {!loading && !isSearching && !error && filteredUsers.length > 0 && (
              <ul className="py-1">
                {filteredUsers.slice(0, 8).map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-900">{user.name}</div>
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </li>
                ))}
                {filteredUsers.length > 8 && (
                  <li className="px-3 py-2 text-center text-sm text-gray-500">
                    +{filteredUsers.length - 8} more users...
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
