import { signRequest } from './security';
import { TransactionResponse } from '../types/transactions';
import { ApiError } from '../types/api';

const API_BASE_URL = 'https://sandbox.yayawallet.com/api/en/transaction';
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

if (!API_KEY || !API_SECRET) {
  throw new Error('API credentials are not configured');
}

export const fetchTransactions = async (
  searchQuery: string,
  page: number
): Promise<TransactionResponse> => {
  try {
    let url: string;
    let options: RequestInit;

    if (searchQuery) {
      // Use search endpoint
      url = `${API_BASE_URL}/search`;
      const signature = signRequest(API_SECRET, { query: searchQuery });
      
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${signature}`,
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({ query: searchQuery }),
      };
    } else {
      // Use find-by-user endpoint with pagination
      url = `${API_BASE_URL}/find-by-user?p=${page}`;
      const signature = signRequest(API_SECRET, { p: page });
      
      options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${signature}`,
          'X-API-Key': API_KEY,
        },
      };
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error: ApiError = {
        message: `API error: ${response.status}`,
        status: response.status,
      };
      throw error;
    }

    const data: TransactionResponse = await response.json();
    return data;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Failed to fetch transactions',
      code: 'FETCH_ERROR',
    };
    throw apiError;
  }
};