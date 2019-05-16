import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddFolder from './AddFolder';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders the complete form', () => {
  const wrapper = shallow(<AddFolder />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
