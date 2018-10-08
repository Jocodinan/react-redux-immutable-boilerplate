import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Test from '../components/test/test.jsx';

configure({ adapter: new Adapter() });

it('renders Test component', ()=>{
  const wrapper = shallow(<Test />);
  expect(wrapper.contains(<h1>Test</h1>)).toEqual(true);
});