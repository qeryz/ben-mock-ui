import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Group {
  id: number;
  name: string;
  companyName: string;
  status: "active" | "inactive" | "pending" | "open_enrollment";
  carrierIds: number[];
  memberCount: number;
  planTypes: string[];
  effectiveDate: Date;
  renewalDate: Date;
  adminContact: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  industry: string;
  employeeRange: string;
  lastActivity: Date;
}

interface GroupState {
  groups: Group[];
  filteredGroups: Group[];
  searchQuery: string;
  loading: boolean;
  error: string | null;

  // Actions
  fetchGroups: () => Promise<void>;
  searchGroups: (query: string) => void;
  clearSearch: () => void;
  getGroupById: (id: number) => Group | undefined;
  getGroupsByCarrier: (carrierId: number) => Group[];
  getGroupsByStatus: (status: Group["status"]) => Group[];
}

// Mock group data
const mockGroups: Group[] = [
  {
    id: 1,
    name: "TechCorp Employee Benefits",
    companyName: "TechCorp Solutions",
    status: "active",
    carrierIds: [1, 2], // Ameritas, Beam
    memberCount: 450,
    planTypes: ["Dental", "Vision"],
    effectiveDate: new Date("2024-01-01"),
    renewalDate: new Date("2024-12-31"),
    adminContact: {
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "(555) 123-4567",
    },
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      zipcode: "94105",
    },
    industry: "Technology",
    employeeRange: "201-500",
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Healthcare Plus Group Plan",
    companyName: "MedCare Associates",
    status: "open_enrollment",
    carrierIds: [3, 4], // Guardian, Principal
    memberCount: 280,
    planTypes: ["Dental", "Vision", "Life Insurance"],
    effectiveDate: new Date("2024-02-01"),
    renewalDate: new Date("2025-01-31"),
    adminContact: {
      name: "Michael Chen",
      email: "m.chen@medcare.com",
      phone: "(555) 987-6543",
    },
    address: {
      street: "456 Medical Plaza",
      city: "Chicago",
      state: "IL",
      zipcode: "60601",
    },
    industry: "Healthcare",
    employeeRange: "101-300",
    lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: "Manufacturing United Benefits",
    companyName: "Industrial Manufacturing Co",
    status: "active",
    carrierIds: [1, 3], // Ameritas, Guardian
    memberCount: 850,
    planTypes: ["Dental", "Vision", "Life Insurance", "Disability"],
    effectiveDate: new Date("2023-07-01"),
    renewalDate: new Date("2024-06-30"),
    adminContact: {
      name: "Rebecca Martinez",
      email: "r.martinez@indmfg.com",
      phone: "(555) 456-7890",
    },
    address: {
      street: "789 Industrial Way",
      city: "Detroit",
      state: "MI",
      zipcode: "48201",
    },
    industry: "Manufacturing",
    employeeRange: "501-1000",
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    name: "Startup Collective Benefits",
    companyName: "Innovation Hub Startups",
    status: "pending",
    carrierIds: [2, 4], // Beam, Principal
    memberCount: 125,
    planTypes: ["Dental", "Vision"],
    effectiveDate: new Date("2024-03-01"),
    renewalDate: new Date("2025-02-28"),
    adminContact: {
      name: "Alex Thompson",
      email: "alex@innovationhub.com",
      phone: "(555) 321-0987",
    },
    address: {
      street: "101 Startup Lane",
      city: "Austin",
      state: "TX",
      zipcode: "73301",
    },
    industry: "Technology",
    employeeRange: "51-200",
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    name: "Financial Services Group",
    companyName: "Premier Financial Advisors",
    status: "open_enrollment",
    carrierIds: [1, 2, 3, 4], // All carriers
    memberCount: 320,
    planTypes: ["Dental", "Vision", "Life Insurance", "Disability"],
    effectiveDate: new Date("2024-01-15"),
    renewalDate: new Date("2024-12-15"),
    adminContact: {
      name: "Jennifer Wilson",
      email: "j.wilson@premierfa.com",
      phone: "(555) 654-3210",
    },
    address: {
      street: "555 Financial District",
      city: "New York",
      state: "NY",
      zipcode: "10005",
    },
    industry: "Financial Services",
    employeeRange: "201-500",
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];

export const useGroupStore = create<GroupState>()(
  devtools(
    (set, get) => ({
      groups: [],
      filteredGroups: [],
      searchQuery: "",
      loading: false,
      error: null,

      fetchGroups: async () => {
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 600));

          set({
            groups: mockGroups,
            filteredGroups: mockGroups,
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      searchGroups: (query: string) => {
        const { groups } = get();
        const filtered = query
          ? groups.filter(
              (group) =>
                group.name.toLowerCase().includes(query.toLowerCase()) ||
                group.companyName.toLowerCase().includes(query.toLowerCase()) ||
                group.industry.toLowerCase().includes(query.toLowerCase()) ||
                group.adminContact.name
                  .toLowerCase()
                  .includes(query.toLowerCase())
            )
          : groups;

        set({
          searchQuery: query,
          filteredGroups: filtered,
        });
      },

      clearSearch: () => {
        const { groups } = get();
        set({
          searchQuery: "",
          filteredGroups: groups,
        });
      },

      getGroupById: (id: number) => {
        const { groups } = get();
        return groups.find((group) => group.id === id);
      },

      getGroupsByCarrier: (carrierId: number) => {
        const { groups } = get();
        return groups.filter((group) => group.carrierIds.includes(carrierId));
      },

      getGroupsByStatus: (status: Group["status"]) => {
        const { groups } = get();
        return groups.filter((group) => group.status === status);
      },
    }),
    { name: "group-store" }
  )
);
