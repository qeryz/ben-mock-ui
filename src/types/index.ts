export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "member" | "viewer";
  createdAt: Date;
  lastActive: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isOpen: boolean;
  createdAt: Date;
}

export interface Carrier {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending";
  type: string;
  config: Record<string, unknown>;
}

export interface Activity {
  id: string;
  type: "user_joined" | "group_created" | "carrier_connected" | "other";
  description: string;
  timestamp: Date;
  userId?: string;
  groupId?: string;
  carrierId?: string;
}

export interface Stats {
  members: number;
  groups: number;
  carriers: number;
  openDiscrepancies: number;
  groupConnectionRequests: number;
  badCarrierConnections: number;
}
