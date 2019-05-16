import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FolderItem from './FolderItem';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders a list item with navLink', () => {
  const folder = {
    id: '1234',
    name: 'Jimney Cricket',
  };
  const wrapper = shallow(<FolderItem folder={folder} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
