import { vi } from 'vitest';

vi.mock('../store/api', async () => {
  const actual = await import('../store/api');

  return {
    ...actual,
    useGetCharacterQuery: vi.fn(() => ({
      data: 'Some data',
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    })),
    useGetCharacterByIdQuery: vi.fn(() => ({
      data: 'Some data',
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    })),
  };
});
