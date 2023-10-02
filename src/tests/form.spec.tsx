import { describe, expect, it } from 'vitest';
import { render, fireEvent } from './test-utils';
import Create from '../pages/create';
import { screen } from '@testing-library/react';

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
});
