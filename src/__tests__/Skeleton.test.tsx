import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Skeleton from '../components/Skeleton';

describe('Skeleton', () => {
  it('renders skeleton', () => {
    const { container } = render(<Skeleton loading={true} />);

    const skeletonElement = container.querySelector('.skeleton');
    expect(skeletonElement).not.toBeNull();
  });
});
