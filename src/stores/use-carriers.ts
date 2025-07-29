import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Carrier {
  id: number;
  name: string;
  slug: string;
  status: "active" | "inactive" | "pending";
  logo: string;
  description: string;
  website: string;
  supportEmail: string;
  apiVersion: string;
  connectionStatus: "connected" | "disconnected" | "error";
  lastSync: Date;
  totalMembers: number;
  totalGroups: number;
  features: string[];
}

interface CarrierState {
  carriers: Carrier[];
  filteredCarriers: Carrier[];
  searchQuery: string;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCarriers: () => Promise<void>;
  searchCarriers: (query: string) => void;
  clearSearch: () => void;
  getCarrierById: (id: number) => Carrier | undefined;
  getCarrierBySlug: (slug: string) => Carrier | undefined;
}

// Mock carrier data
const mockCarriers: Carrier[] = [
  {
    id: 1,
    name: "Ameritas",
    slug: "ameritas",
    status: "active",
    logo: "/icons/carriers/ameritas-logo.jpg",
    description: "Leading dental and vision insurance provider",
    website: "https://ameritas.com",
    supportEmail: "support@ameritas.com",
    apiVersion: "v2.1",
    connectionStatus: "connected",
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    totalMembers: 25420,
    totalGroups: 186,
    features: ["Dental", "Vision", "Life Insurance", "Disability"],
  },
  {
    id: 2,
    name: "Beam",
    slug: "beam",
    status: "active",
    logo: "/icons/carriers/beam-logo.jpg",
    description: "Modern dental benefits with preventive care focus",
    website: "https://beam.dental",
    supportEmail: "support@beam.dental",
    apiVersion: "v3.0",
    connectionStatus: "connected",
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    totalMembers: 18750,
    totalGroups: 124,
    features: ["Dental", "Preventive Care", "Teledentistry"],
  },
  {
    id: 3,
    name: "Guardian",
    slug: "guardian",
    status: "active",
    logo: "/icons/carriers/guardian-logo.png",
    description: "Comprehensive insurance and employee benefits",
    website: "https://guardianlife.com",
    supportEmail: "support@guardianlife.com",
    apiVersion: "v2.5",
    connectionStatus: "connected",
    lastSync: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    totalMembers: 42100,
    totalGroups: 298,
    features: ["Dental", "Vision", "Life Insurance", "Disability", "Medical"],
  },
  {
    id: 4,
    name: "Principal",
    slug: "principal",
    status: "active",
    logo: "/icons/carriers/principal-logo.png",
    description: "Retirement, insurance, and investment solutions",
    website: "https://principal.com",
    supportEmail: "support@principal.com",
    apiVersion: "v2.3",
    connectionStatus: "error",
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    totalMembers: 31850,
    totalGroups: 215,
    features: ["Dental", "Vision", "Life Insurance", "Retirement"],
  },
];

export const useCarrierStore = create<CarrierState>()(
  devtools(
    (set, get) => ({
      carriers: [],
      filteredCarriers: [],
      searchQuery: "",
      loading: false,
      error: null,

      fetchCarriers: async () => {
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 800));

          set({
            carriers: mockCarriers,
            filteredCarriers: mockCarriers,
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
        }
      },

      searchCarriers: (query: string) => {
        const { carriers } = get();
        const filtered = query
          ? carriers.filter(
              (carrier) =>
                carrier.name.toLowerCase().includes(query.toLowerCase()) ||
                carrier.description
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                carrier.features.some((feature) =>
                  feature.toLowerCase().includes(query.toLowerCase())
                )
            )
          : carriers;

        set({
          searchQuery: query,
          filteredCarriers: filtered,
        });
      },

      clearSearch: () => {
        const { carriers } = get();
        set({
          searchQuery: "",
          filteredCarriers: carriers,
        });
      },

      getCarrierById: (id: number) => {
        const { carriers } = get();
        return carriers.find((carrier) => carrier.id === id);
      },

      getCarrierBySlug: (slug: string) => {
        const { carriers } = get();
        return carriers.find((carrier) => carrier.slug === slug);
      },
    }),
    { name: "carrier-store" }
  )
);
