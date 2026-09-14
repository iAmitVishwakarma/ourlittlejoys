import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { FAQPage } from '../StaticPages';

describe('FAQPage Accordion Component', () => {
  it('renders all FAQ questions with first item open by default', () => {
    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getByText(/what age groups are little joys products suitable for\?/i)).toBeInTheDocument();

    // First FAQ answer is open by default
    expect(
      screen.getByText(/our products are specifically formulated by pediatricians for different growth stages/i)
    ).toBeInTheDocument();
  });

  it('toggles accordion items when clicked with aria-expanded update', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    );

    const firstQuestionBtn = screen.getByRole('button', {
      name: /what age groups are little joys products suitable for\?/i,
    });
    expect(firstQuestionBtn).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await user.click(firstQuestionBtn);
    expect(firstQuestionBtn).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText(/our products are specifically formulated by pediatricians for different growth stages/i)
    ).not.toBeInTheDocument();

    // Click second question to expand
    const secondQuestionBtn = screen.getByRole('button', {
      name: /are little joys products 100% natural and free from white sugar\?/i,
    });
    expect(secondQuestionBtn).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondQuestionBtn);
    expect(secondQuestionBtn).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText(/we do not use any refined white sugar/i)
    ).toBeInTheDocument();
  });
});
