import React from 'react';
import { render, screen } from '@testing-library/react';
import VectorDistanceSelect from '.';
import { noOp } from '../../../../test/utils';
import { VectorDistance } from '../../../../utils/constants';

describe('<VectorDistanceSelect>', () => {
  test('Renders the component label and options', () => {
    render(<VectorDistanceSelect onChange={noOp} value={VectorDistance.DOT} />);
    const select = screen.getByTestId('distance-select');
    expect(select).toBeInTheDocument();
  });
});
