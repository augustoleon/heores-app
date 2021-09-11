import React from 'react';

import { mount } from "enzyme";
import { useContext } from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoute } from "../../routers/DashboardRoute";


describe('Pruebas en <DasboardRoute />', () => {
    

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true, 
            name: 'Juanito'
        }
    };

    test('debe mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoute />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( 'Juanito' );
        
    });
    
    
})
