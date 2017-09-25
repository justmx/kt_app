import React from 'react'
import { shallow } from 'enzyme'
import Document from '../Document'
import { userDetails, mandatoryFiles, supportFiles } from '../../../../utils/mockData'

const router = {
  push: jest.fn()
}

describe('<Document />', () => {
  it('renders a Document using Enzyme', () => {
    const wrapper = shallow(
      <Document
        user={userDetails}
        router={router}
        mandatoryFiles={[]}
        supportFiles={[]}
      />
    )
    expect(wrapper.find('#user_detail').length).toBe(1)
  })

  it('will show error message if no files loaded and submit button is clicked', () => {
    const wrapper = shallow(
      <Document
        user={userDetails}
        router={router}
        mandatoryFiles={[]}
        supportFiles={[]}
      />
    )
    wrapper.find('#submit_button').simulate('click')
    expect(wrapper.find('.error_msg').length).toBe(1)
    expect(wrapper.contains(
      <h6 className='error_msg'>
        You have to submit Mandatory files and Supporting files to continue
      </h6>
      ))
  })
  it('router.push will be called if both mandatory and support files are loaded', () => {
    const wrapper = shallow(
      <Document
        user={userDetails}
        router={router}
        mandatoryFiles={mandatoryFiles}
        supportFiles={supportFiles}
        resetFiles={jest.fn()}
      />
    )
    const routerProp = wrapper.instance().props.router
    const routeTo = jest.spyOn(routerProp, 'push')
    wrapper.find('#submit_button').simulate('click')
    expect(routeTo).toHaveBeenCalled()
  })
})
