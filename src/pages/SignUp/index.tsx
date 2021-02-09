import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';

import getValidationsErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';


import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';


interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório!'),
                email: Yup.string()
                  .required('E-mail obrigatório!')
                  .email('Digite um e-mail válido!'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
              });

              await schema.validate(data, {
                abortEarly: false,
              });

              await api.post('/users', data);

              addToast({
                type: 'success',
                title: 'Cadastro realizado',
                description: 'Você já pode fazer seu logon no GoBarber',
              });

              history.push('/');
            
        } catch (err) {
          if(err instanceof Yup.ValidationError) {
            const errors = getValidationsErrors(err);
            formRef.current?.setErrors(errors);
            return;
          }

          addToast({
            type: 'success',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
          });

        }
        },[addToast, history]);


    return (
        <Container>
        <Background />
  
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />
  
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>
  
              <Input name="name" placeholder="Nome" icon={FiUser} />
              <Input name="email" placeholder="E-mail" icon={FiMail} />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                icon={FiLock}
              />
              <Button type="submit">Cadastrar</Button>
            </Form>
  
            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    )
}

export default SignUp;