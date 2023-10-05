import { describe, expect, it, } from 'vitest';
import { render, fireEvent } from './test-utils';
import Create from '../../../pages/create';
import { screen } from '@testing-library/react';
import FormBody from '..';

const mockedData = {
  id: "4",
  name: "Pedro",
  email: "pedro@email.com",
  userType: "Usuário Comum",
  age: 22
}

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
    expect(await screen.findByText('Email é um campo obrigatorio')).toBeTruthy();
    expect(await screen.findByText('Perfil é um campo obrigatorio')).toBeTruthy();
  });

  it('deve renderizar os defaultValues quando o componente for carregado', () => {
    render(<FormBody type='visualize' defaultValues={mockedData} title='Teste' />)

    expect(screen.getByDisplayValue('Pedro')).toBeTruthy()
    expect(screen.getByDisplayValue('22')).toBeTruthy()
    expect(screen.getByDisplayValue('pedro@email.com')).toBeTruthy()
    expect(screen.getByDisplayValue('Usuário Comum')).toBeTruthy()
    //Valor default de telefone
    expect(screen.getByDisplayValue('(00) 00000-0000')).toBeTruthy()
  })
});
