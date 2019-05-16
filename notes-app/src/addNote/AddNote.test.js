import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNote from './AddNote';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders the complete form', () => {
  const wrapper = shallow(<AddNote />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
