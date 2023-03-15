import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmationDialog from '.';
import { noOp } from '../../test/utils';

describe('<ConfirmationDialog>', () => {
  test('renders Title and text', () => {
    const TITLE = 'Dialog title';
    const TEXT = 'Dialog text';
    render(
      <ConfirmationDialog
        onClose={noOp}
        onConfirm={noOp}
        title={TITLE}
        text={TEXT}
      />
    );
    const title = screen.getByText(TITLE);
    const text = screen.getByText(TEXT);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
