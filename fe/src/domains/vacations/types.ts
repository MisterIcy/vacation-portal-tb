type PhpDateTime = string | { date: string; timezone_type: number; timezone: string };

export interface Vacation {
  id: number;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  from: PhpDateTime;
  to: PhpDateTime;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  authorized_by: number | null;
  created_at: PhpDateTime;
  updated_at: PhpDateTime;
}

export interface CreateVacationRequest {
  from: string;
  to: string;
  reason: string;
}
