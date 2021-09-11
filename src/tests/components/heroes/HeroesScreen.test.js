import React from 'react';
import { mount } from 'enzyme';
import { HeroesScreen } from '../../../components/heroes/HeroesScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroesScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    
    test('debe de mostrar el argumento redirect si no hay argumentis eb ek URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroesScreen history={ historyMock }/>
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe( true );

    });

    test('debe de mostrar el argumento redirect si no hay argumentis eb ek URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ HeroesScreen }/>
            </MemoryRouter>
        ); 

        expect( wrapper.find('.row').exists() ).toBe( true );
        

    });

    test('debe de regresar a la pantalla con el path "/"', () => {
        
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroesScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalledWith();

    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroesScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).not.toHaveBeenCalledWith();
        expect( historyMock.goBack ).toHaveBeenCalled();

    });

    test('debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider17836']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroesScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');

    })
    
    
    
    
})
