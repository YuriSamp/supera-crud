import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from './test-utils';
import Create from '../../../pages/create';
import { screen } from '@testing-library/react';
import Edit from '../../../pages/edit';

// vi.mock('react-router-dom', () => ({
//   ...vi.importActual('react-router-dom'),
//   useSearchParams: () => [new URLSearchParams({ id: '1' })]
// }))

describe('form test', () => {
  it('deve renderizar o componente corretamente', () => {
    render(<Create />);

    expect(screen.getByText('Criar novo usuário')).toBeTruthy();
    expect(screen.getByPlaceholderText('Nome')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Telefone')).toBeTruthy();
    expect(screen.getByPlaceholderText('Idade')).toBeTruthy();
    expect(screen.getByText('Adicionar usuário')).toBeTruthy();
  });

  it('deve exibir mensagem de erro quando enviar formulário com campos vazios', async () => {
    render(<Create />);

    fireEvent.click(screen.getByText('Adicionar usuário'));

    expect(await screen.findByText('Nome é um campo obrigatorio')).toBeTruthy();
  });
  it('deve renderizar os defaultValues quando o componente for carregado', () => {
    render(<Edit />)

  })
});
